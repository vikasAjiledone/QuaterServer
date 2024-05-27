const mongoose = require("mongoose");


const interiorDesignerSchema = new mongoose.Schema({
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


const interiorDesigner = mongoose.model("Interior Designer", interiorDesignerSchema);


module.exports = interiorDesigner;