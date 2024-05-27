const express = require("express");
const multer = require("multer");
const headerOne = require("../models/headerOneSchema");
const { unlink } = require("fs");


const headerOneController = async (req, res) => {
  const headerCount = await headerOne.count();

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

      const savedHeader = await headerOne.find({});

      const updateHeaderId = savedHeader[0]._id;

      const imagePath = savedHeader[0].Image;

      unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
          throw new Error("Image deletion failed");
        }
        console.log("image deleted successful");
      });

      const updatedHeader = await headerOne.updateOne(
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

      const newHeaderOne = new headerOne({
        Title: title,
        Description: description,
        Image: image,
      });

      const savedResponse = await newHeaderOne.save();

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

const getHeaderOneController = async (req, res) => {
  try {
    const savedResponse = await headerOne.find({});

    const headerOneData = savedResponse[0];

    if (headerOneData) {
      return res.status(201).json({
        status: true,
        Message: "successfully fetched data",
        headerOneData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: true,
      Message: "something went wrong while fetching data",
    });
  }
};

module.exports = { headerOneController, getHeaderOneController };
