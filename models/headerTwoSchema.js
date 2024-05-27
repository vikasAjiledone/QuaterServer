const mongoose = require("mongoose");

const headerTwoSchema = new mongoose.Schema({
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

const headerTwo = mongoose.model("HeaderTwo", headerTwoSchema);


module.exports = headerTwo;