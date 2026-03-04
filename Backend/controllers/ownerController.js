const userSchema = require("../models/UserSchema");
const propertySchema = require("../models/PropertySchema");
const bookingSchema = require("../models/BookingSchema");

//////////adding property by owner////////
const addPropertyController = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));
    }

    // FIX 1: findById({_id: id}) is wrong syntax — just pass id directly
    const user = await userSchema.findById(req.body.userId);

    // FIX 2: no null check on user — crashes with "Cannot read properties of null"
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

    return res.status(200).send({ success: true, message: "New Property has been stored" });
  } catch (error) {
    console.log("AddProperty error:", error);
    // FIX 3: catch block had no res.send() — server would hang with no response
    return res.status(500).send({ success: false, message: error.message });
  }
};

///////////all properties of owner/////////
const getAllOwnerPropertiesController = async (req, res) => {
  const { userId } = req.body;
  try {
    // FIX 4: validate userId
    if (!userId) {
      return res.status(400).send({ message: "userId is required", success: false });
    }

    // FIX 5: was fetching ALL properties then filtering in JS memory — inefficient
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
    // FIX 6: findByIdAndDelete({_id: id}) is wrong — pass id directly
    const deleted = await propertySchema.findByIdAndDelete(propertyId);

    // FIX 7: no check if property actually existed before deleting
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

    // FIX 8: findByIdAndUpdate({_id: id}, ...) — pass id directly
    const property = await propertySchema.findByIdAndUpdate(
      propertyid,
      { ...req.body, ownerId: req.body.userId },
      { new: true }
    );

    // FIX 9: no check if property was found
    if (!property) {
      return res.status(404).send({ success: false, message: "Property not found" });
    }

    return res.status(200).send({ success: true, message: "Property updated successfully." });
  } catch (error) {
    console.error("UpdateProperty error:", error);
    return res.status(500).json({ success: false, message: "Failed to update property." });
  }
};

const getAllBookingsController = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).send({ message: "userId is required", success: false });
    }

    // FIX 10: was fetching ALL bookings then filtering in JS memory — inefficient
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
    // FIX 11: no validation — missing fields cause silent failures
    if (!bookingId || !propertyId || !status) {
      return res.status(400).send({ success: false, message: "bookingId, propertyId and status are required" });
    }

    // FIX 12: findByIdAndUpdate({_id: id}, ...) — pass id directly
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