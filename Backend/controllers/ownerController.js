const userSchema = require("../models/UserSchema");
const propertySchema = require("../models/PropertySchema");
const bookingSchema = require("../models/BookingSchema");

//////////adding property by owner////////
const addPropertyController = async (req, res) => {
  try {
    const { propertyType, propertyAdType, propertyAddress, ownerContact, propertyAmt } = req.body;

    // Validate required fields
    if (!propertyType || !propertyAdType || !propertyAddress || !ownerContact || !propertyAmt) {
      return res.status(400).send({ 
        success: false, 
        message: "Please provide all required property details" 
      });
    }

    if (!req.body.userId) {
      return res.status(400).send({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    let images = [];
    if (req.cloudinaryFiles && req.cloudinaryFiles.length > 0) {
      images = req.cloudinaryFiles.map((file) => ({
        filename: file.public_id,
        path: file.secure_url,
      }));
    }

    const user = await userSchema.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "Owner user not found" });
    }

    const newPropertyData = new propertySchema({
      ...req.body,
      propertyImage: images,
      ownerId: user._id,
      ownerName: user.name,
      isAvailable: "Available",
    });

    await newPropertyData.save();
    return res.status(201).send({ success: true, message: "Property added successfully" });
  } catch (error) {
    console.log("AddProperty error:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

///////////all properties of owner/////////
const getAllOwnerPropertiesController = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).send({ message: "userId is required", success: false });
    }
    const ownerProperties = await propertySchema.find({ ownerId: userId });
    return res.status(200).send({ success: true, data: ownerProperties });
  } catch (error) {
    console.error("GetOwnerProperties error:", error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

//////delete the property by owner/////
const deletePropertyController = async (req, res) => {
  const propertyId = req.params.propertyid;
  try {
    const deleted = await propertySchema.findByIdAndDelete(propertyId);
    if (!deleted) {
      return res.status(404).send({ success: false, message: "Property not found" });
    }
    return res.status(200).send({ success: true, message: "The property is deleted" });
  } catch (error) {
    console.error("DeleteProperty error:", error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

//////updating the property/////////////
const updatePropertyController = async (req, res) => {
  const { propertyid } = req.params;
  try {
    if (!propertyid) {
      return res.status(400).send({ success: false, message: "Property ID is required" });
    }

    const updateData = { ...req.body, ownerId: req.body.userId };

    // Agar nai image upload ki hai toh Cloudinary URL use karo
    if (req.cloudinaryFile) {
      updateData.propertyImage = [{
        filename: req.cloudinaryFile.public_id,
        path: req.cloudinaryFile.secure_url,
      }];
    }

    const property = await propertySchema.findByIdAndUpdate(
      propertyid,
      updateData,
      { new: true }
    );

    if (!property) {
      return res.status(404).send({ success: false, message: "Property not found" });
    }

    return res.status(200).send({ success: true, message: "Property updated successfully." });
  } catch (error) {
    console.error("UpdateProperty error:", error);
    return res.status(500).send({ success: false, message: "Failed to update property." });
  }
};

const getAllBookingsController = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).send({ message: "userId is required", success: false });
    }
    const ownerBookings = await bookingSchema.find({ ownerID: userId });
    return res.status(200).send({ success: true, data: ownerBookings });
  } catch (error) {
    console.error("GetOwnerBookings error:", error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

//////////handle bookings status//////////////
const handleAllBookingstatusController = async (req, res) => {
  const { bookingId, propertyId, status } = req.body;
  try {
    if (!bookingId || !propertyId || !status) {
      return res.status(400).send({ success: false, message: "bookingId, propertyId and status are required" });
    }

    const booking = await bookingSchema.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send({ success: false, message: "Booking not found" });
    }

    await propertySchema.findByIdAndUpdate(
      propertyId,
      { isAvailable: status === "booked" ? "Unavailable" : "Available" },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: `Changed the booking status to ${status}`,
    });
  } catch (error) {
    console.error("HandleBookingStatus error:", error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  addPropertyController,
  getAllOwnerPropertiesController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
  handleAllBookingstatusController,
};