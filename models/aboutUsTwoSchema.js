const mongoose = require("mongoose");

const aboutUsTwoSchema = new mongoose.Schema({
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

const aboutUsTwo = mongoose.model("aboutUsTwo", aboutUsTwoSchema);

module.exports = aboutUsTwo;
