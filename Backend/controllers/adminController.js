const userSchema = require("../models/UserSchema");
const propertySchema = require("../models/PropertySchema");
const bookingSchema = require("../models/BookingSchema");

/////////getting all users///////////////
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find({});

    return res.status(200).send({
      success: true,
      message: "All users",
      data: allUsers,
    });
  } catch (error) {
    console.log("GetAllUsers error:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

/////////handling status for owner/////////
const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    // FIX 3: no validation — missing fields cause silent DB errors
    if (!userid || !status) {
      return res.status(400).send({ success: false, message: "userid and status are required" });
    }

    const user = await userSchema.findByIdAndUpdate(
      userid,
      { granted: status },
      { new: true }
    );

    // FIX 4: no check if user actually exists
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    return res.status(200).send({
      success: true,
      message: `User has been ${status}`,
    });
  } catch (error) {
    console.log("HandleStatus error:", error);
    // FIX 5: catch block had no res.send() — server would hang with no response
    return res.status(500).send({ success: false, message: error.message });
  }
};

/////////getting all properties in app//////////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});

    // FIX 6: same as getAllUsers — find({}) never returns null
    return res.status(200).send({
      success: true,
      message: "All properties",
      data: allProperties,
    });
  } catch (error) {
    console.log("GetAllProperties error:", error);
    // FIX 7: catch block had no res.send() — server would hang with no response
    return res.status(500).send({ success: false, message: error.message });
  }
};

////////get all bookings////////////
const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await bookingSchema.find({});

    return res.status(200).send({
      success: true,
      data: allBookings,
    });
  } catch (error) {
    console.log("GetAllBookings error:", error);
    // FIX 8: catch block had no res.send() — server would hang with no response
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsersController,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController,
};