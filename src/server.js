require("dotenv").config();
const app = require("./app");
const connectDB = require("../config/db");

const PORT = process.env.PORT || 3001;

connectDB().catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
  console.warn("Starting API without MongoDB. Using in-memory fallback.");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
