const express = require("express");
const interiorDesigner = require("../models/interiorDesignerSchema");
const { unlink } = require("fs");

const interiorDesignerController = async (req, res) => {
  const interiorDesignerCount = await interiorDesigner.count();
  try {
    if (interiorDesignerCount > 0) {
      const { paragraphOne, paragraphTwo } = req.body;
      const image = req.files;

      if (!paragraphOne || !paragraphTwo || !image) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const savedDesign = await interiorDesigner.find({});

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

      const updatedInteriorDesign = await interiorDesigner.updateOne(
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

      const newInteriorDesign = new interiorDesigner({
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

const getInteriorDesigner = async (req, res) => {
  try {
    const savedInteriorDesigner = await interiorDesigner.find({});

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

module.exports = { interiorDesignerController, getInteriorDesigner };
