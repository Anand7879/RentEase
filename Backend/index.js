require("dotenv").config();
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
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

// ✅ FIX: Express + path-to-regexp v8 no longer accepts bare "*" as a wildcard.
//         Use "(.*)" instead — this fixes the "Missing parameter name" crash.
// cors() with preflightContinue: false handles OPTIONS automatically — no app.options() needed
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});