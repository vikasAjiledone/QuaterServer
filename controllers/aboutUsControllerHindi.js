const express = require("express");
const aboutUsHindi = require("../models/aboutUsSchema Hindi");
const { unlink } = require("fs");

const aboutUsControllerHindi = async (req, res) => {
  const aboutUsHindiCount = await aboutUsHindi.count();

  try {
    if (aboutUsHindiCount > 0) {
      const { title, description, services, textbox } = req.body;

      const image = req.files.image[0].path;
      const icons = req.files.icons;
      const iconPaths = [];

      for (const key in icons) {
        iconPaths.push(icons[key].path);
      }

      if (!title || !description || !services || !textbox || !image || !icons) {
        return res
          .status(422)
          .json({ status: false, message: "please filled required fields" });
      }

      const savedResponse = await aboutUsHindi.find({});

      const aboutUsWhoHasToUpdate = savedResponse[0]._id;
      const deleteIcons = savedResponse[0].ServicesImages;
      const deleteImages = savedResponse[0].Image;

      for (let index = 0; index < deleteIcons.length; index++) {
        unlink(deleteIcons[index], (err) => {
          if (err) {
            console.log("image doesn't deleted");
          } else {
            console.log("image deleted successfully");
          }
        });
      }

      unlink(deleteImages, (err) => {
        if (err) {
          console.log("image doesn't deleted");
        } else {
          console.log("image deleted successfully");
        }
      });

      const updateAboutUs = await aboutUsHindi.updateOne(
        { _id: aboutUsWhoHasToUpdate },
        {
          $set: {
            Title: title,
            Description: description,
            Services: services,
            Textbox: textbox,
            Image: image,
            ServicesImages: iconPaths,
          },
        }
      );

      if (updateAboutUs.acknowledged) {
        return res
          .status(201)
          .json({ status: true, Messgae: "aboutUs successfully created" });
      }
    } else {
      const { title, description, services, textbox } = req.body;

      const image = req.files.image[0].path;
      const icons = req.files.icons;
      const iconPaths = [];

      for (const key in icons) {
        iconPaths.push(icons[key].path);
      }

      if (!title || !description || !services || !textbox || !image || !icons) {
        return res
          .status(422)
          .json({ status: false, message: "please filled required fields" });
      }

      const newAboutUs = new aboutUsHindi({
        Title: title,
        Description: description,
        Services: services,
        Textbox: textbox,
        Image: image,
        ServicesImages: iconPaths,
      });

      const savedResponse = await newAboutUs.save();

      if (savedResponse) {
        return res
          .status(201)
          .json({ status: true, message: "aboutUs created successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

const getAboutUsHindi = async (req, res) => {
  try {
    const savedAboutUs = await aboutUsHindi.find({});

    return res.status(201).json({
      status: true,
      message: "successfully fetched about us",
      savedAboutUs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { aboutUsControllerHindi, getAboutUsHindi };
