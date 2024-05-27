const express = require("express");
const router = express.Router();
const multer = require("multer");
const { aboutUsTwoControllerHindi, getAboutUsTwoHindi } = require("../controllers/aboutUsTwoControllerHindi");
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/aboutUsTwo Hindi"));
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
  { name: "image", maxCount: 1 },
  { name: "subimages", maxCount: 4 },
]);

router.patch("/addAboutUsTwoHindi", multipleUpload, aboutUsTwoControllerHindi);
router.get("/getAboutUsTwoHindi", getAboutUsTwoHindi);

module.exports = router;
