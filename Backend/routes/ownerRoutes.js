const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const multerStorageCloudinary = require("multer-storage-cloudinary");
const CloudinaryStorage = multerStorageCloudinary.CloudinaryStorage || multerStorageCloudinary;
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addPropertyController,
  getAllOwnerPropertiesController,
  handleAllBookingstatusController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
} = require("../controllers/ownerController");

const router = express.Router();

// ── Cloudinary Config ──
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer + Cloudinary Storage ──
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rentease-properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.post(
  "/postproperty",
  upload.array("propertyImages"),
  authMiddleware,
  addPropertyController
);

router.get("/getallproperties", authMiddleware, getAllOwnerPropertiesController);
router.get("/getallbookings", authMiddleware, getAllBookingsController);
router.post("/handlebookingstatus", authMiddleware, handleAllBookingstatusController);

router.delete(
  "/deleteproperty/:propertyid",
  authMiddleware,
  deletePropertyController
);

router.patch(
  "/updateproperty/:propertyid",
  upload.single("propertyImage"),
  authMiddleware,
  updatePropertyController
);

module.exports = router;