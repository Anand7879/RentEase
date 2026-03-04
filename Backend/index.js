const dotenv = require("dotenv");
dotenv.config(); // FIX: dotenv.config() SABSE PEHLE — before any other imports
                 // that might use process.env (routes, middleware, DB config)

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // FIX: PATCH missing — needed for updateProperty
  credentials: true,
}));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});