const mongoose = require("mongoose");


const interiorDesignerHindiSchema = new mongoose.Schema({
    ParagraphOne:{
        type: String,
        required: true
    },
    ParagraphTwo:{
        type: String,
        required: true
    },
    Image: {
        type: Array
    }
})


const interiorDesignerHindi = mongoose.model("Interior Designer Hindi", interiorDesignerHindiSchema);


module.exports = interiorDesignerHindi;