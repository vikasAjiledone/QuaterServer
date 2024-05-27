const mongoose = require("mongoose");

const three_D_DesignSchema = new mongoose.Schema({
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

const three_D_Design = mongoose.model("3-D Design", three_D_DesignSchema);

module.exports = three_D_Design;
