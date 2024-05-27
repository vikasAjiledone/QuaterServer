const express = require("express");
const multer = require("multer");
const headerTwo = require("../models/headerTwoSchema");
const { unlink } = require("fs");

const headerTwoController = async (req, res) => {
  const headerCount = await headerTwo.count();

  try {
    if (headerCount > 0) {
      console.log("inside this function ");
      const { title, description } = req.body;

      const image = req.file.path;

      if (!title || !description || !image) {
        return res
          .status(422)
          .json({ status: false, Message: "Please provide required fields" });
      }

      const savedHeader = await headerTwo.find({});

      const updateHeaderId = savedHeader[0]._id;

      const imagePath = savedHeader[0].Image;

      unlink(imagePath, (err) => {
        if (err) {
          throw new Error("Image deletion failed");
        }
        console.log("image deleted successful");
      });

      const updatedHeader = await headerTwo.updateOne(
        { _id: updateHeaderId },
        { $set: { Title: title, Description: description, Image: image } }
      );

      if (updatedHeader.acknowledged) {
        return res
          .status(201)
          .json({ status: true, Message: "header saved successfully" });
      }
    } else {
      const { title, description } = req.body;

      const image = req.file.path;

      if (!title || !description || !image) {
        return res
          .status(422)
          .json({ status: false, Message: "Please provide required fields" });
      }

      const newHeaderTwo = new headerTwo({
        Title: title,
        Description: description,
        Image: image,
      });

      const savedResponse = await newHeaderTwo.save();

      if (savedResponse) {
        return res
          .status(201)
          .json({ status: true, Message: "header saved successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, Message: "something went wrong", error });
  }
};

const getHeaderTwoController = async (req, res) => {
  try {
    const savedResponse = await headerTwo.find({});

    const headerTwoData = savedResponse[0];

    if (headerTwoData) {
      return res
        .status(201)
        .json({
          status: true,
          message: "successfully fetched data",
          headerTwoData,
        });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({
        status: false,
        message: "something went wrong while fetching data",
        error,
      });
  }
};

module.exports = { headerTwoController, getHeaderTwoController };
