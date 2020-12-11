const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird"); // making asynchronous nature and use 'bluebird' library

const PhotoSchema = new Schema({

    "images":{
        type:String,
        unique:true,
    },
    "caption": {
        type: String,
        required : true,
    },
    "description": {
        type: String,
        required : true,
    },
    "price": {
        type: Number,
        required : true,
    },
    "Bedroom": {
        type: Number,
        required : true,
    },
    "Bathroom": {
        type: Number,
        required : true,
    },
    "WiFi" : {
        type: Boolean,
        required : true,
    },
    "location": {
        type: String,
    },
  "createdOn" : {
      type: Date,
      default: Date.now,
  }

    });

    module.exports = mongoose.model("UploadPhoto",PhotoSchema);  