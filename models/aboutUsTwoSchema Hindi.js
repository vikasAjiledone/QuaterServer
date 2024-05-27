const mongoose = require("mongoose");

const aboutUsTwoHindiSchema = new mongoose.Schema({
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
      required: true,
    },
  ],
  SubServices: [
    {
      type: String,
      required: true,
    },
  ],
  Image: {
    type: String,
  },
  SubImages: [
    {
      type: String,
    },
  ],
});

const aboutUsTwoHindi = mongoose.model("aboutUsTwo Hindi", aboutUsTwoHindiSchema);

module.exports = aboutUsTwoHindi;
