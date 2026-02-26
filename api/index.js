require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    return res.status(500).json({
      message: "Database connection failed"
    });
  }
};
