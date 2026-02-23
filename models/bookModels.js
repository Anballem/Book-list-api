const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      required: true
    },
    amazonLink: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

