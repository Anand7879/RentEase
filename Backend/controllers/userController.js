const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/UserSchema");
const propertySchema = require("../models/PropertySchema");
const bookingSchema = require("../models/BookingSchema");

//////////for registering/////////////////////////////
const registerController = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    // FIX 1: validate all fields upfront — missing fields cause 500 crash
    if (!name || !email || !password || !type) {
      return res.status(400).send({ message: "All fields are required", success: false });
    }

    const existsUser = await userSchema.findOne({ email });
    if (existsUser) {
      return res.status(409).send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // FIX 2: was mutating req.body directly (req.body.password = hashedPassword)
    // This is bad practice — build a clean object instead
    const userData = {
      name,
      email,
      password: hashedPassword,
      type,
      ...(type === "Owner" && { granted: "ungranted" }),
    };

    const newUser = new userSchema(userData);
    await newUser.save();

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

////for the login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIX 3: validate fields — prevents crash if frontend sends empty body
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required", success: false });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    // FIX 4: user.password = undefined does NOT reliably remove password from
    // a Mongoose document before sending — convert to plain object first
    const userObj = user.toObject();
    delete userObj.password;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Login successful",
      success: true,
      user: userObj,
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

/////forgetting password
const forgotPasswordController = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // FIX 6: validate all fields
    if (!email || !password || !confirmPassword) {
      return res.status(400).send({ message: "All fields are required", success: false });
    }

    // FIX 7: password match check should also happen on backend
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      // FIX 8: was returning status 200 for "not found" — should be 404
      return res.status(404).send({ message: "User not found", success: false });
    }

    // FIX 9: redundant updatedUser.save() after findOneAndUpdate — removed
    return res.status(200).send({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.log("ForgotPassword error:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

////auth controller
const authController = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    // FIX 10: was sending password in auth response — use toObject + delete
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).send({ success: true, data: userObj });
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(500).send({ message: "Auth error", success: false });
  }
};

/////////get all properties in home
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});
    // FIX 11: find({}) never returns null — it returns [] — the null check
    // was wrongly throwing an error when DB is simply empty
    return res.status(200).send({ success: true, data: allProperties });
  } catch (error) {
    console.log("GetAllProperties error:", error);
    return res.status(500).send({ message: "Server error", success: false });
  }
};

///////////booking handle///////////////
const bookingHandleController = async (req, res) => {
  const { propertyid } = req.params;
  const { userDetails, status, userId, ownerId } = req.body;

  try {
    // FIX 12: no validation — crashes if userDetails is undefined
    if (!userDetails || !userDetails.fullName || !userDetails.phone) {
      return res.status(400).send({ success: false, message: "Full name and phone are required" });
    }
    if (!userId || !ownerId || !status) {
      return res.status(400).send({ success: false, message: "userId, ownerId and status are required" });
    }

    const booking = new bookingSchema({
      propertyId: propertyid,
      userID: userId,
      ownerID: ownerId,
      userName: userDetails.fullName,
      phone: userDetails.phone,
      bookingStatus: status,
    });

    await booking.save();

    return res.status(200).send({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).send({ success: false, message: "Error handling booking" });
  }
};

/////get all bookings for single tenants//////
const getAllBookingsController = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).send({ message: "userId is required", success: false });
    }

    // FIX 13: was fetching ALL bookings from DB then filtering in JS memory
    // Very inefficient — filter directly in DB query
    const userBookings = await bookingSchema.find({ userID: userId });

    return res.status(200).send({ success: true, data: userBookings });
  } catch (error) {
    console.error("GetBookings error:", error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
};