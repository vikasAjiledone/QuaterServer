const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const connectDB = require("./Database/connectDB");
const headerOneRoute = require("./routes/headerOne");
const headerTwoRoute = require("./routes/headerTwo");
const aboutUsRoute = require("./routes/aboutUs");
const aboutUsTwoRoute = require("./routes/aboutUsTwo");
const addOurMainFocusRoute = require("./routes/ourMainFocus");
const two_D_DesignRoute = require("./routes/2_D_Design");
const three_D_DesignRoute = require("./routes/3_D_Design");
const interiorDesignRoute = require("./routes/interiorDesign");
const hireSiteEngineerRoute = require("./routes/hireSiteEngineer");
const headerOneHindiRoute = require("./routes/headerOneHindi");
const headerTwoHindiRoute = require("./routes/headerTwoHindi");
const aboutUsHindiRoute = require("./routes/aboutUsHindi");
const aboutUsTwoHindiRoute = require("./routes/aboutUsTwoHindi");
const addOurMainFocusHindiRoute = require("./routes/ourMainFocusHindi");
const two_D_DesignHindiRoute = require("./routes/2_D_DesignHindi");
const three_D_DesignHindiRoute = require("./routes/3_D_DesignHindi");
const interiorDesignHindiRoute = require("./routes/interiorDesignHindi");
const hireSiteEngineerHindiRoute = require("./routes/hireSiteEngineerHindi");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./public/uploads"));
app.use(headerOneRoute);
app.use(headerTwoRoute);
app.use(aboutUsRoute);
app.use(aboutUsTwoRoute);
app.use(addOurMainFocusRoute);
app.use(two_D_DesignRoute);
app.use(three_D_DesignRoute);
app.use(interiorDesignRoute);
app.use(hireSiteEngineerRoute);
app.use(headerOneHindiRoute);
app.use(headerTwoHindiRoute);
app.use(aboutUsHindiRoute);
app.use(aboutUsTwoHindiRoute);
app.use(addOurMainFocusHindiRoute);
app.use(two_D_DesignHindiRoute);
app.use(three_D_DesignHindiRoute);
app.use(interiorDesignHindiRoute);
app.use(hireSiteEngineerHindiRoute);

app.listen(5000, (req, res) => {
  console.log("server is running");
}); 
 
connectDB
  .then((res) => {
    console.log("connection is successful");
  })
  .catch((err) => {
    console.log("connection is failed " + err);
  });
