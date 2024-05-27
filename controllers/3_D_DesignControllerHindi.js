const express = require("express");
const three_D_DesignHindi = require("../models/3_D_Design Hindi");
const { unlink } = require("fs");

const three_D_DesignControllerHindi = async (req, res) => {
  const three_D_DesignHindiCount = await three_D_DesignHindi.count();
  try {
    if (three_D_DesignHindiCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await three_D_DesignHindi.find({});

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

      const updatedThreeD_Design = await three_D_DesignHindi.updateOne(
        { _id: savedThreeD_DesignId },
        {
          $set: {
            ParagraphOne: paragraphOne,
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

      const newThreeD_Design = new three_D_DesignHindi({
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

const getThreeD_DesignHindi = async (req, res) => {
  try {
    const savedThreeD_Design = await three_D_DesignHindi.find({});

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

module.exports = { three_D_DesignControllerHindi, getThreeD_DesignHindi };
