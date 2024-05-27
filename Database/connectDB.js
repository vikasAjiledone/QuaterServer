const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

let url = process.env.DATABASE;

const connectDB = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = connectDB;