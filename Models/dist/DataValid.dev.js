"use strict";

var userModel = require("../Models/userModel");

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult;

var moment = require('moment');

var IsValid = [check('email', 'Right Email is required').exists().isEmail().normalizeEmail(), check('email', 'Email already in use').custom(function (value) {
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
}).trim(), check('Fname', 'First name please').exists().trim(), check('Lname', 'Last name please').exists().trim(), check('age', 'Empty age').exists().trim(), check('age', 'you are under 18 OMG !!!').custom(function (age) {
  if (18 > moment().format('YYYY') - moment(age).format('YYYY')) {
    throw new Error();
  }

  return true;
})];
module.exports = IsValid;