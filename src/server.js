const express = require("express");
require("dotenv").config();
const bookRoutes = require("../routes/bookRoutes");
const errorHandler = require("../middleware/errorHandler");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use("/api", bookRoutes);
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
