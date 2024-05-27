const mongoose = require("mongoose");


const ourMainFocusHindiSchema = new mongoose.Schema({
  Tile: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String
      }
    },
  ],
});

const ourMainFocusHindi = mongoose.model("ourmainfocus Hindi", ourMainFocusHindiSchema);

module.exports = ourMainFocusHindi;
