const express = require('express');
const db = require('../config/database');
const ImageRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file
*/
ImageRouter.route('/uploadmulter').post(
  upload.single('imageData'),
  (req, res, next) => {
    console.log(req.body);
    db.user
      .findOne({ where: { email: req.body.email } })
      .then(function(record) {
        return record.update({
          imageName: req.body.imageName,
          imageData: req.file.path
        });
      })
      .then(user => res.json({ success: true }))
      .catch(err => next(err));
  }
);
module.exports = ImageRouter;
