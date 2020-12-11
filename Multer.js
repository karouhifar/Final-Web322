const multer = require("multer");
const path = require("path");
const PHOTO_DIRECTORY = "./public/photos/";
const fs = require("fs");
const moment = require('moment');

if (!fs.existsSync(PHOTO_DIRECTORY)){
    fs.mkdirSync(PHOTO_DIRECTORY,{recursive:true});
}

const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
        cb(null,PHOTO_DIRECTORY)
      },
      filename : (req, file,cb) =>  {
        let NamePhoto = file.originalname.substring(file.originalname.charAt(0),file.originalname.lastIndexOf('.'));
    cb(null,NamePhoto+'_'+ moment().format('YYYY-MM-DD') + path.extname(file.originalname)); 
    }
    });
    module.exports = multer({ storage:storage});