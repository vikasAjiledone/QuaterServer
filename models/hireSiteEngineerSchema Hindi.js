const mongoose = require("mongoose");

const hireSiteEngineerHindiSchema = new mongoose.Schema({
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

const hireSiteEngineerHindi = mongoose.model(
  "Hire Site Engineer Hindi",
  hireSiteEngineerHindiSchema
);

module.exports = hireSiteEngineerHindi;
