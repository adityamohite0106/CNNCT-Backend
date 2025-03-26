require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err); // More detailed logs
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // ✅ Fix: Ensure correct route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
