const mongoose = require("mongoose");


const ourMainFocusSchema = new mongoose.Schema({
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

const ourMainFocus = mongoose.model("ourmainfocus", ourMainFocusSchema);

module.exports = ourMainFocus;
