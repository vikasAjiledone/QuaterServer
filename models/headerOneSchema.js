const mongoose = require("mongoose");

const headerOneSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  Image: {
    type: String,
    required: true,
  },
});

const headerOne = mongoose.model("HeaderOne", headerOneSchema);


module.exports = headerOne;
