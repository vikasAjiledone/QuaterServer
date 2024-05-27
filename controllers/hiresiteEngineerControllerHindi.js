const express = require("express");
const hireSiteEngineerHindi = require("../models/hireSiteEngineerSchema Hindi");
const { unlink } = require("fs");

const hireSiteEngineerControllerHindi = async (req, res) => {
  const hireSiteEngineerHindiCount = await hireSiteEngineerHindi.count();
  try {
    if (hireSiteEngineerHindiCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await hireSiteEngineerHindi.find({});

      const savedHireSiteEngineerId = savedDesign[0]._id;
      const savedHireSiteEngineerImages = savedDesign[0].Image[0].images;
      const deleteSavedImage = [];

      for (let index = 0; index < savedHireSiteEngineerImages.length; index++) {
        deleteSavedImage.push(savedHireSiteEngineerImages[index].path);
      }

      for (let index = 0; index < deleteSavedImage.length; index++) {
        unlink(deleteSavedImage[index], (err) => {
          if (err) {
            console.log("image delete succesfully");
          } else {
            console.log("image successfully deleted");
          }
        });
      }

      const updatedHireSiteEngineer = await hireSiteEngineerHindi.updateOne(
        { _id: savedHireSiteEngineerId },
        {
          $set: {
            ParagraphOne: paragraphOne,
            ParagraphTwo: paragraphTwo,
            Image: image,
          },
        }
      );

      if (updatedHireSiteEngineer.acknowledged) {
        return res
          .status(201)
          .json({ status: true, message: "successully created" });
      }
    } else {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const newHireSiteEngineer = new hireSiteEngineerHindi({
        ParagraphOne: paragraphOne,
        ParagraphTwo: paragraphTwo,
        Image: image,
      });

      const savedResponse = await newHireSiteEngineer.save();

      if (savedResponse) {
        return res
          .status(201)
          .json({ status: true, message: "succesfully created" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

const getHireSiteEngineerHindi = async (req, res) => {
  try {
    const savedInteriorEngineer = await hireSiteEngineerHindi.find({});

    return res.status(201).json({
      status: true,
      messgage: "successfully fetched interior designer data",
      savedInteriorEngineer,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { hireSiteEngineerControllerHindi, getHireSiteEngineerHindi };
