const express = require("express");
const ourMainFocusHindi = require("../models/ourMainFocusSchema Hindi");
const { unlink } = require("fs");

const ourMainFocusControllerHindi = async (req, res) => {
  const ourMainFocusHindiCount = await ourMainFocusHindi.count();
  try {
    if (ourMainFocusHindiCount > 0) {
      const { tile } = req.body;
      const { tile1, tile2, tile3, tile4 } = req.files;

      if (!tile || !tile1 || !tile2 || !tile3 || !tile4) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const tile1path = tile1[0].path;
      const tile2path = tile2[0].path;
      const tile3path = tile3[0].path;
      const tile4path = tile4[0].path;

      tile[0].image = tile1path;
      tile[1].image = tile2path;
      tile[2].image = tile3path;
      tile[3].image = tile4path;

      const savedMainFocus = await ourMainFocusHindi.find({});

      const savedMainFocusId = savedMainFocus[0]._id;
      const deleteTile1path = savedMainFocus[0].Tile[0].image;
      const deleteTile2path = savedMainFocus[0].Tile[1].image;
      const deleteTile3path = savedMainFocus[0].Tile[2].image;
      const deleteTile4path = savedMainFocus[0].Tile[3].image;

      const deleteAllImageFiles = [
        deleteTile1path,
        deleteTile2path,
        deleteTile3path,
        deleteTile4path,
      ];

      for (let index = 0; index < deleteAllImageFiles.length; index++) {
        unlink(deleteAllImageFiles[index], (err) => {
          if (err) {
            console.log("image doesn't delete");
          } else {
            console.log("image deleted successfully");
          }
        });
      }

      const updatedMainFocus = await ourMainFocusHindi.updateOne(
        { _id: savedMainFocusId },
        { $set: { Tile: tile } }
      );

      if (updatedMainFocus.acknowledged) {
        return res
          .status(201)
          .json({ status: true, message: "successfully created ourMainFocus" });
      }
    } else {
      const { tile } = req.body;
      const { tile1, tile2, tile3, tile4 } = req.files;

      if (!tile || !tile1 || !tile2 || !tile3 || !tile4) {
        return res
          .status(422)
          .json({ status: false, message: "please provide requested field" });
      }

      const tile1path = tile1[0].path;
      const tile2path = tile2[0].path;
      const tile3path = tile3[0].path;
      const tile4path = tile4[0].path;

      tile[0].image = tile1path;
      tile[1].image = tile2path;
      tile[2].image = tile3path;
      tile[3].image = tile4path;

      const newOurMainFocused = new ourMainFocusHindi({
        Tile: tile,
      });

      const savedResponse = await newOurMainFocused.save();

      if (savedResponse) {
        return res
          .status(201)
          .json({ status: true, message: "successfully created tile" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getOurMainFocusHindi = async (req, res) => {
  try {
    const savedGetOurMainFocus = await ourMainFocusHindi.find({});

    return res
      .status(201)
      .json({
        status: true,
        message: "Successfully fetched ourMainFocus Data",
        savedGetOurMainFocus,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: false, message: "something went wrong", error });
  }
};

module.exports = { ourMainFocusControllerHindi, getOurMainFocusHindi };
