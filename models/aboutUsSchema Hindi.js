const mongoose = require("mongoose");

const aboutUsHindiSchema = new mongoose.Schema({
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

const aboutUsHindi = mongoose.model("aboutus Hindi", aboutUsHindiSchema);

module.exports = aboutUsHindi;
