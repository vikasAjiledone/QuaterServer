const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Services: [
    {
      type: String,
    },
  ],
  Image: {
    type: String,
    required: true,
  },
  ServicesImages: [
    {
      type: String,
    },
  ],
  Textbox: {
    type: String,
    required: true,
  },
});

const aboutUs = mongoose.model("aboutus", aboutUsSchema);

module.exports = aboutUs;
