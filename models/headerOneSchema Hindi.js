const mongoose = require("mongoose");

const headerOneHindiSchema = new mongoose.Schema({
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

const headerOneHindi = mongoose.model("HeaderOne Hindi", headerOneHindiSchema);


module.exports = headerOneHindi;
