"use strict";

var userModel = require("./userModel"); //------------------------------------------- Register Validation


var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

var moment = require('moment');

var IsValidRegister = [check('email', 'Right Email is required').exists().isEmail().normalizeEmail(), check('email', 'Email already in use').custom(function (value) {
  return userModel.findOne({
    "email": value
  }).then(function (user) {
    if (user) {
      return Promise.reject(new Error());
    }

    return true;
  });
}), check('password', 'Right Password is required').exists().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).trim(), check('password', 'Please check the password length').isLength({
  min: 6,
  max: 12
}).trim(), check('Fname', 'First name please').notEmpty().trim(), check('Lname', 'Last name please').notEmpty().trim(), check('age', 'Empty age').notEmpty().trim(), check('age', 'you are under 18 OMG !!!').custom(function (age) {
  if (18 > moment().format('YYYY') - moment(age).format('YYYY')) {
    throw new Error();
  }

  return true;
})]; //---------------------------------- Login Validation

var DataValidationLogin = [check('Email', 'Empty Login Email').notEmpty().normalizeEmail(), check('Password', 'Empty Login Password').notEmpty()];
module.exports.IsValidRegister = IsValidRegister;
module.exports.DataValidationLogin = DataValidationLogin;