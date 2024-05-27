const express = require("express");
const hireSiteEngineer = require("../models/hireSiteEngineerSchema");
const { unlink } = require("fs");

const hireSiteEngineerController = async (req, res) => {
  const hireSiteEngineerCount = await hireSiteEngineer.count();
  try {
    if (hireSiteEngineerCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await hireSiteEngineer.find({});

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

      const updatedHireSiteEngineer = await hireSiteEngineer.updateOne(
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

      const newHireSiteEngineer = new hireSiteEngineer({
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

const getHireSiteEngineer = async (req, res) => {
  try {
    const savedInteriorEngineer = await hireSiteEngineer.find({});

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

module.exports = { hireSiteEngineerController, getHireSiteEngineer };
