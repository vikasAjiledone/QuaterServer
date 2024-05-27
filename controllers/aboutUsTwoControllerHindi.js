const express = require("express");
const aboutUsTwoHindi = require("../models/aboutUsTwoSchema Hindi");
const { unlink } = require("fs");

const aboutUsTwoControllerHindi = async (req, res) => {
  const aboutUsTwoHindiCount = await aboutUsTwoHindi.count();
  try {
    if (aboutUsTwoHindiCount > 0) {
      const { title, description, services, subServices } = req.body;
      const image = req.files.image[0].path;
      const subImages = req.files.subimages;
      const subImagesPath = [];
      if (
        !title ||
        !description ||
        !services ||
        !subServices ||
        !image ||
        !subImages
      ) {
        return res
          .status(422)
          .json({ status: false, message: "please provide required filled" });
      }

      for (const key in subImages) {
        subImagesPath.push(subImages[key].path);
      }

      const savedAboutUs = await aboutUsTwoHindi.find({});

      const aboutUsTwoId = savedAboutUs[0]._id;
      const aboutUsImagePath = savedAboutUs[0].Image;
      const aboutUsSubImagesPath = savedAboutUs[0].SubImages;

      for (let index = 0; index < aboutUsSubImagesPath.length; index++) {
        unlink(aboutUsSubImagesPath[index], (err) => {
          if (err) {
            console.log("image doesn't deleted");
          } else {
            console.log("image deleted successfully");
          }
        });
      }

      unlink(aboutUsImagePath, (err) => {
        if (err) {
          console.log("image doesn't deleted");
        } else {
          console.log("image deleted successfully");
        }
      });

      const updatedAboutUs = await aboutUsTwoHindi.updateOne(
        { _id: aboutUsTwoId },
        {
          $set: {
            Title: title,
            Description: description,
            Services: services,
            SubServices: subServices,
            Image: image,
            SubImages: subImagesPath,
          },
        }
      );

      if (updatedAboutUs.acknowledged) {
        return res
          .status(201)
          .json({ status: true, message: "succesfully created aboutUsTwo" });
      }
    } else {
      const { title, description, services, subServices } = req.body;
      const image = req.files.image[0].path;
      const subImages = req.files.subimages;
      const subImagesPath = [];

      if (
        !title ||
        !description ||
        !services ||
        !subServices ||
        !image ||
        !subImages
      ) {
        return res
          .status(422)
          .json({ status: false, message: "please provide required filled" });
      }

      for (const key in subImages) {
        subImagesPath.push(subImages[key].path);
      }

      const newAboutUsTwo = new aboutUsTwoHindi({
        Title: title,
        Description: description,
        Services: services,
        SubServices: subServices,
        Image: image,
        SubImages: subImagesPath,
      });

      const savedNewAboutUsTwo = await newAboutUsTwo.save();

      if (savedNewAboutUsTwo) {
        return res
          .status(201)
          .json({ status: true, message: "aboutUsTwo successfully created" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

const getAboutUsTwoHindi = async (req, res) => {
  try {
    const savedAboutUsTwo = await aboutUsTwoHindi.find({});

    return res
      .status(201)
      .json({
        status: true,
        message: "successfully fetch aboutUs two",
        savedAboutUsTwo,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { aboutUsTwoControllerHindi, getAboutUsTwoHindi };
