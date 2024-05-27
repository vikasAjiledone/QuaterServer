const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  ourMainFocusController,
  getOurMainFocus,
} = require("../controllers/ourMainFocusController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/ourMainFocus"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!"); // custom this message to fit your needs
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const multipleUpload = upload.fields([
  { name: "tile1", maxCount: 1 },
  { name: "tile2", maxCount: 1 },
  { name: "tile3", maxCount: 1 },
  { name: "tile4", maxCount: 1 },
]);

router.patch("/addOurMainFocus", multipleUpload, ourMainFocusController);
router.get("/getOurMainFocus", getOurMainFocus);

module.exports = router;
