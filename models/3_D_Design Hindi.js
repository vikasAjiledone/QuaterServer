const mongoose = require("mongoose");

const three_D_DesignHindiSchema = new mongoose.Schema({
  ParagraphOne: {
    type: String,
    required: true,
  },
  ParagraphTwo: {
    type: String,
    required: true,
  },
  Image: {
    type: Array,
  },
});

const three_D_DesignHindi = mongoose.model("3-D Design Hindi", three_D_DesignHindiSchema);

module.exports = three_D_DesignHindi;
