const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8001",
      "http://127.0.0.1:5173",
      "https://hunthouse.netlify.app",
      "https://rentease-d3zn.onrender.com",
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS - Origin: " + origin));
    }
  },
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  exposedHeaders: ["Content-Length", "X-JSON-Response"],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false, // ✅ FIX 1: was true — this caused preflight to never respond
};

// ✅ Handle preflight OPTIONS first, before any other middleware
app.options("*", cors(corsOptions));

// ✅ Apply CORS to all routes
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); // ✅ FIX 2: removed duplicate express.json() and cookieParser()

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});