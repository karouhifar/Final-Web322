const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird"); // making asynchronous nature and use 'bluebird' library


const UserSchema = new Schema({

    Fname: {
        type: String,
        required: true,
      },
      Lname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
       unique:true
      },
      password : {
        type: String,
        required: true
      },
      privacy: {
        type: Boolean,
        required: true,
      },
      age: {
        type:Number,
        required: true,
      },
      type: {
        type: String,
        default: "user",
      },
    });
    UserSchema.pre("save", function (next) {
      bcrypt
        .genSalt(10)
        .then((salt) => {
          console.log(salt);
          bcrypt
            .hash(this.password, salt)
            .then((encryptedData) => {
              this.password = encryptedData;
              console.log( this.password);
              next();
            })
            .catch((err) => {
              `Hashing Error occured: ${err}`;
            });
        })
        .catch((err) => {
          console.log(`Salting Error Occured: ${err}`);
        });
    })
    module.exports = mongoose.model("User",UserSchema);