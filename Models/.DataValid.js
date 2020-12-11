const userModel = require("./userModel");
//------------------------------------------- Register Validation
const {check,validationResult} = require("express-validator");
const moment = require('moment');
const IsValidRegister = [
    check('email', 'Right Email is required').exists().isEmail().normalizeEmail(),
    check('email','Email already in use').custom(value => {
        return userModel.findOne({"email":value}).then(user => {
          if (user) {
            return Promise.reject( new Error());
          }
          return true;
        });
      }),
    check('password', 'Right Password is required').exists().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).trim(),

    check('password', 'Please check the password length').isLength({
        min: 6,
        max: 12
    }).trim(),

    check('Fname', 'First name please').notEmpty().trim(),
    check('Lname', 'Last name please').notEmpty().trim(),
    check('age', 'Empty age').notEmpty().trim(),

    check('age', 'you are under 18 OMG !!!')
    .custom((age) => {
        if (18 > (moment().format('YYYY') - (moment(age).format('YYYY')))) {
            throw new Error();
        }
        return true;
    })

];
//---------------------------------- Login Validation
const DataValidationLogin = [
  check('Email', 'Empty Login Email').notEmpty().normalizeEmail(),
  check('Password', 'Empty Login Password').notEmpty(),
];
module.exports.IsValidRegister =IsValidRegister;
module.exports.DataValidationLogin = DataValidationLogin;
