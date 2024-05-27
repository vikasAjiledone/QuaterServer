const express = require("express");
const two_D_DesignHindi = require("../models/2_D_Design Hindi");
const { unlink } = require("fs");

const two_D_DesignControllerHindi = async (req, res) => {
  const two_D_DesignHindiCount = await two_D_DesignHindi.count();
  try {
    if (two_D_DesignHindiCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await two_D_DesignHindi.find({});

      const savedTwoD_DesignId = savedDesign[0]._id;
      const savedTwoD_DesignImages = savedDesign[0].Image[0].images;
      const deleteSavedImage = [];

      for (let index = 0; index < savedTwoD_DesignImages.length; index++) {
        deleteSavedImage.push(savedTwoD_DesignImages[index].path);
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

      const updatedTwoD_Design = await two_D_DesignHindi.updateOne(
        { _id: savedTwoD_DesignId },
        {
          $set: {
            ParagraphOne: paragraphOne,
            ParagraphTwo: paragraphTwo,
            Image: image,
          },
        }
      );

      if (updatedTwoD_Design.acknowledged) {
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

      const newtwo_D_Design = new two_D_DesignHindi({
        ParagraphOne: paragraphOne,
        ParagraphTwo: paragraphTwo,
        Image: image,
      });

      const savedResponse = await newtwo_D_Design.save();

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

const getTwo_D_DesignHindi = async (req, res) => {
  try {
    const savedTwoD_Design = await two_D_DesignHindi.find({});

    return res.status(201).json({
      status: true,
      message: "successfully fetched 2-D Design data",
      savedTwoD_Design,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ Status: false, message: "something went wrong", error });
  }
};

module.exports = { two_D_DesignControllerHindi, getTwo_D_DesignHindi };
