const express = require("express");
const bookRoutes = require("../routes/bookRoutes");
const errorHandler = require("../middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/api", bookRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(errorHandler);

module.exports = app;
