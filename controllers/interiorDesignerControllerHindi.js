const express = require("express");
const interiorDesignerHindi = require("../models/interiorDesignerSchema Hindi");
const { unlink } = require("fs");

const interiorDesignerControllerHindi = async (req, res) => {
  const interiorDesignerHindiCount = await interiorDesignerHindi.count();
  try {
    if (interiorDesignerHindiCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await interiorDesignerHindi.find({});

      const savedInteriorDesignId = savedDesign[0]._id;
      const savedInteriorDesignImages = savedDesign[0].Image[0].images;
      const deleteSavedImage = [];

      for (let index = 0; index < savedInteriorDesignImages.length; index++) {
        deleteSavedImage.push(savedInteriorDesignImages[index].path);
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

      const updatedInteriorDesign = await interiorDesignerHindi.updateOne(
        { _id: savedInteriorDesignId },
        {
          $set: {
            ParagraphOne: paragraphOne,
            ParagraphTwo: paragraphTwo,
            Image: image,
          },
        }
      );

      if (updatedInteriorDesign.acknowledged) {
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

      const newInteriorDesign = new interiorDesignerHindi({
        ParagraphOne: paragraphOne,
        ParagraphTwo: paragraphTwo,
        Image: image,
      });

      const savedResponse = await newInteriorDesign.save();

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

const getInteriorDesignerHindi = async (req, res) => {
  try {
    const savedInteriorDesigner = await interiorDesignerHindi.find({});

    return res.status(201).json({
      Status: true,
      message: "successfully fetched interior design data",
      savedInteriorDesigner,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { interiorDesignerControllerHindi, getInteriorDesignerHindi };
