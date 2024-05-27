const express = require("express");
const three_D_Design = require("../models/3_D_Design");
const { unlink } = require("fs");

const three_D_DesignController = async (req, res) => {
  const three_D_DesignCount = await three_D_Design.count();
  try {
    if (three_D_DesignCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await three_D_Design.find({});

      const savedThreeD_DesignId = savedDesign[0]._id;
      const savedThreeD_DesignImages = savedDesign[0].Image[0].images;
      const deleteSavedImage = [];

      for (let index = 0; index < savedThreeD_DesignImages.length; index++) {
        deleteSavedImage.push(savedThreeD_DesignImages[index].path);
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

      const updatedThreeD_Design = await three_D_Design.updateOne(
        { _id: savedThreeD_DesignId },
        {
          $set: {
            paragraphOne: paragraphOne,
            ParagraphTwo: paragraphTwo,
            Image: image,
          },
        }
      );

      if (updatedThreeD_Design.acknowledged) {
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

      const newThreeD_Design = new three_D_Design({
        ParagraphOne: paragraphOne,
        ParagraphTwo: paragraphTwo,
        Image: image,
      });

      const savedResponse = await newThreeD_Design.save();

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

const getThreeD_Design = async (req, res) => {
  try {
    const savedThreeD_Design = await three_D_Design.find({});

    return res.status(201).json({
      status: true,
      message: "successfullt fetched data of 3-D Design",
      savedThreeD_Design,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { three_D_DesignController, getThreeD_Design };
