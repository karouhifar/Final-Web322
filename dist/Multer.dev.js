"use strict";

var multer = require("multer");

var path = require("path");

var PHOTO_DIRECTORY = "./public/photos/";

var fs = require("fs");

var moment = require('moment');

if (!fs.existsSync(PHOTO_DIRECTORY)) {
  fs.mkdirSync(PHOTO_DIRECTORY, {
    recursive: true
  });
}

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, PHOTO_DIRECTORY);
  },
  filename: function filename(req, file, cb) {
    var NamePhoto = file.originalname.substring(file.originalname.charAt(0), file.originalname.lastIndexOf('.'));
    cb(null, NamePhoto + '_' + moment().format('YYYY-MM-DD') + path.extname(file.originalname));
  }
});
module.exports = multer({
  storage: storage
});