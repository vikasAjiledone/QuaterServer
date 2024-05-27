const mongoose = require("mongoose");

const headerTwoHindiSchema = new mongoose.Schema({
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

const headerTwoHindi = mongoose.model("HeaderTwo Hindi", headerTwoHindiSchema);


module.exports = headerTwoHindi;