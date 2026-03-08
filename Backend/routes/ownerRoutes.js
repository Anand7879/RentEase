const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
// ✅ FIX: v1 uses default export, v2+ uses named export — support both
const cloudinaryStorageModule = require("multer-storage-cloudinary");
const CloudinaryStorage = cloudinaryStorageModule.CloudinaryStorage || cloudinaryStorageModule;
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
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer + Cloudinary Storage ──
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "rentease-properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// ✅ FIX 4: authMiddleware runs BEFORE upload so unauthenticated requests
//           are rejected immediately without wasting Cloudinary bandwidth.
//           multer error handler added so upload failures return JSON, not a crash.
router.post(
  "/postproperty",
  authMiddleware,
  (req, res, next) => {
    upload.array("propertyImages")(req, res, (err) => {
      if (err) {
        console.error("Multer/Cloudinary upload error:", err);
        return res.status(400).json({ success: false, message: "Image upload failed: " + err.message });
      }
      next();
    });
  },
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

// ✅ FIX 5: same wrapped upload pattern for update route
router.patch(
  "/updateproperty/:propertyid",
  authMiddleware,
  (req, res, next) => {
    upload.single("propertyImage")(req, res, (err) => {
      if (err) {
        console.error("Multer/Cloudinary upload error:", err);
        return res.status(400).json({ success: false, message: "Image upload failed: " + err.message });
      }
      next();
    });
  },
  updatePropertyController
);

module.exports = router;