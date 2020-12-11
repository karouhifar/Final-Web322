const userModel = require("../../Models/userModel");
const photoModel = require("../photoModel");
const data =require("../../express");
var session = require('express-session');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const moment = require('moment');
const handle_bar2 = require('handlebars');
const _ = require("underscore");
const {check,validationResult} = require("express-validator");
const PHOTO_DIRECTORY = "./public/photos/";

//--------------------------------------------------------------

var name = {
  data: "Room_list",
};
var name1 = {
  data: "Registration",
};
var name2 = {
  data: "Admin_Login",
};

//--------------------------------------------------------------
module.exports.checkLogin = (req, res, next) => {

  if (!req.session.userInfo) {
    res.render("User_Registration", {
      LoginMismatchErrors: " Error 403 : Unauthorized access",
      layout: false
    });
  } else {
    next();
  }

};
//--------------------------------------------------------------
module.exports.checkAdminORUser = (req, res, next) => {

  if (req.session.userInfo.type === "Admin") {
    res.render("user/admin-dashboard", {
      layout: false,
      title: name2,
      userInfo: req.session.userInfo
    });
  } else {
    res.render("user/user-dashboard", {
      layout: false,
      title: name2,
      userInfo: req.session.userInfo
    });
  }

};
//--------------------------------------------------------------
module.exports.renderHomePage = (req, res, next) => {
  photoModel.find().lean()
  .exec()
  .then((room) => {

  res.render("Home", {
    layout: false,
    userInfo: req.session.userInfo
  });
  });
};
//--------------------------------------------------------------
module.exports.renderRoomListPage = (req, res, next) => {
  photoModel.find().lean()
    .exec()
    .then((photos) => {

      _.each(photos, (photo) => {
        photo.uploadDate = new Date(photo.createdOn).toDateString();
      });
   
      if (req.session.userInfo && req.session.userInfo.type === "Admin"){
        req.session.UserAdmin = {
        admin :req.session.userInfo
        }
     
      }
   
      
      res.render("Room_list", { 
        UserAdmin: req.session.UserAdmin,
        layout: false,
        title: name,
        userInfo: req.session.userInfo,
        photos: photos,
        hasPhotos: !!photos.length
      });
    })  
    .catch((err) => {
      console.log(`Error file ${err}`)
    });

};
//--------------------------------------------------------------
module.exports.UploadPhoto = (req, res, next) => {
  console.log(req.file.filename);
  const file = req.file;
  if(!file){
    const error = new Error("Please upload the file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const locals = {
    message: "Your photo was uploaded successfully Proceed to Room list",
    layout: false,
    userInfo: req.session.userInfo
  };
  
  console.log("Get to upload post");
  var flag_WiFi = req.body.WiFi;
  switch (flag_WiFi) {
    case "YES":
      flag_WiFi = true;
      console.log("WiFI is positive");
      break;
    case "NO":
      flag_WiFi = false;
      console.log("WiFI is negative");
      break;
    case "Yes":
      flag_WiFi = true;
      break;
    case "No":
      flag_WiFi = false;
      break;
    default: {
      console.log("ERROR in WiFi");
      res.render("user/admin-dashboard", {
        error: "Please write (YES / NO) in text",
        layout: false,
        userInfo: req.session.userInfo
      });
      break;
    }
  };
  if (flag_WiFi == false|| flag_WiFi == true) {


  const Location  = req.body.location.toLowerCase();

    const photoMetadata = new photoModel({
      images: req.file.filename,
      caption: req.body.caption,
      description: req.body.description,
      price: req.body.price,
      Bedroom: req.body.Bedroom,
      Bathroom: req.body.Bathroom,
      WiFi: flag_WiFi,
      location: Location,
    });
    console.log("Save the MongoDB");
    console.log(photoMetadata);
    photoMetadata.save()
      .then((data) => {
     
        res.render("user/admin-dashboard", locals);
      })
      .catch((err) => {
        console.log(`Error file ${err}`)
      });
     
  }
};
//--------------------------------------------------------------

module.exports.renderRegisterPage = (req, res, next) => {
  res.render("User_Registration", {
    layout: false,
    title: name1,
    success: req.session.success,
    errors: req.session.errors,
    userInfo: req.session.userInfo
  });
  req.session.errors = null;
  req.session.success = null;
};

module.exports.renderAdminLoginPage = (req, res, next) => {
  res.render("login_admin", {
    layout: false,
    title: name2,
    userInfo: req.session.userInfo
  });
};

//--------------------------------------------------------------
module.exports.renderLoginPage = (req, res, next) => {

  let errors = validationResult(req);


  if (!errors.isEmpty()) {
    let LoginErrors = errors.array();

    return res.render("User_Registration", {
      LoginErrors: LoginErrors,
      layout: false
    })
  } else {
 

    userModel.findOne({
        email: req.body.Email
      })
      .then((user) => {
        let databaseErrors = [];
        
        if (user == null) {
          databaseErrors.push("Sorry, your email and/or password empty");
          res.render("User_Registration", {
            databaseErrors,
            layout: false,

          });
          databaseErrors = null;
        } else {
          bcrypt
            .compare(req.body.Password, user.password)
            .then((isMatched) => {
              if (isMatched) {
                req.session.userInfo = {
                  id: user._id,
                  email: user.email,
                  password: user.password,
                  Fname: user.Fname,
                  Lname: user.Lname,
                  type: user.type,
                  privacy: user.privacy
                };
                res.redirect("/dashboard");
              } else {
                databaseErrors.push("Sorry, your email and/or password are wrong");
                res.render("User_Registration", {
                  databaseErrors,
                  layout: false,
                });
                databaseErrors = null;
              }

            })
            .catch((err) => console.log(`Error while comparing ${err}`));
        }

      })
      .catch((err) => console.log(`Error while finding a user ${err}`));
   
  }
  
};

//--------------------------------------------------------------
module.exports.renderLogoutPage = (req, res) => {
  req.session.destroy();
  req.session = null;
  res.redirect("/");

};
//--------------------------------------------------------------
module.exports.getRenderLoginPage = (req, res, next) => {
  res.redirect("/User_Registration")

};

module.exports.registerInfo = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      req.session.success = false;
      res.redirect('/User_Registration');
      console.log("ERROR VALIDATION !!!");
      req.session.errors = null;
      req.session.success = null;
  } else {
      req.session.success = true;
      console.log("Validation is successful ")


     

      const Form_data = req.body;
      const birthdayResult = moment().format('YYYY') - moment(req.body.age).format('YYYY');

      //   const JSON_data = " Sample of JSON:"+JSON.stringify(Form_data) ;
      const DATA = "Thanks for registering to our KamiB&B, Mr/Mrs " + " " +
          Form_data.Fname + " " + Form_data.Lname + " Register is successful";

      const register = {
          Fname: Form_data.Fname,
          Lname: Form_data.Lname,
          email: Form_data.email,
          age: birthdayResult,
          password: Form_data.password, // Random user-defined Password to keep it in privacy
          privacy: true
      };

      const newUser = new userModel(register);
      newUser.save().then((user) => {
              console.log(`User Created${user}`);
              var emailOption = {
                  from: "web322.kamyab@gmail.com",
                  to: Form_data.email,
                  subject: 'Test email from Node.js',
                  html: '<p> Hello ' + Form_data.Fname + '</p><p> Thank you for registering kamiB&B.</p> <br> <p> we love <strong style="color:red;"> Clint Macdonald</strong>'
              };

              var email_data = data.transporter.sendMail(emailOption);
              email_data
                  .then(() => {
                      console.log("Sending Email SUCCESS !!!")
                  })


                  .catch((err) => {
                      console.log(`Error on Email ${err}`);
                  });
          })
          .catch((err) => {
              console.log(`There is an error: ${err}`);
              process.exit(1); // Stop running and return error msg /
          });



      console.log(Form_data);

      handle_bar2.registerHelper('increment', function (index=0) {
          index++;
          return index;
      })

      res.render('User_Registration', {
          // data: register,
          Info: DATA,
          //Json:JSON_data,
          layout: false,
      });
      req.session.errors = null;
      req.session.success = null;


  }
  //res.send(DATA);


};
//-----------------------------------------------------------
module.exports.search = (req, res, next)=>{
  var location_id = req.body.location.toLowerCase();
  console.log(req.body.location);
  photoModel.find({location : location_id}).lean()
  .exec()
  .then((roomdata) => {
    console.log(roomdata);
    
    res.render('Room_list', {layout: false,  hasPhotos:!!roomdata.length , photos:roomdata,  userInfo: req.session.userInfo});
  })
  .catch((err) => {
    console.log(err);
  });

};
//-----------------------------------------------------------
module.exports.deletePhoto= (req, res,next) => {
  const filename = req.params.filename;
  
  photoModel.deleteOne({images: filename})
  .exec()
  .then(() => {
    fs.unlink(PHOTO_DIRECTORY + filename, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Removed file : " + filename);
    }); 
  
  
    res.redirect("/Room_list");
  }).catch((err) => {
    console.log(err);
   
  });
};
//-----------------------------------------------------------
module.exports.Room_Description=function(req, res){
  let id_url = req.params.id;
  photoModel.find({_id : id_url}).lean()
  .exec()
  .then((roomDetail) => {
 
  res.render('Room_description', {layout: false,  userInfo:req.session.userInfo  ,room: roomDetail});
})
.catch((err) => {
  console.log(err);
});

};
//-----------------------------------------------------------
module.exports.Booking = function(req, res,next){

  let id_room = req.params.id;
  let guests = req.body.guests;
  let ReqCheckIn = req.body.checkin;
  let ResCheckOut = req.body.checkout;

  let checkIn =  moment(ReqCheckIn, 'YYYY/MM/DD');
  let checkOut = moment(ResCheckOut, 'YYYY/MM/DD');
  let days = checkOut.diff(checkIn, 'days');

  console.log(days);
  photoModel.find({_id : id_room}).lean()
  .exec()
  .then((roomInfo) => {

    const emailBooking = {
      from: "web322.kamyab@gmail.com",
      to: req.session.userInfo.email,
      subject: 'Booking Conformation',
      html: '<p> Dear ' + req.session.userInfo.Fname + '</p><p> Your Booking has been confirmed for '+roomInfo[0].caption +' room.</p> <br> <p> we love <strong style="color:red;"> Clint Macdonald</strong>'
  };

  const email_data = data.transporter.sendMail(emailBooking);
  email_data
      .then(() => {
          console.log("Booking Email SUCCESS !!!")
      })


      .catch((err) => {
          console.log(`Error on Booking Email ${err}`);
      });

  console.log(roomInfo[0].price);
   let rate = roomInfo[0].price * days;
  
  res.render('book', {layout:false, room: roomInfo, rate: rate, days: days,userInfo:req.session.userInfo,guests:guests });
  
  });
  
  };