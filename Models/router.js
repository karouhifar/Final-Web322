 // Giving access to built-in router
const express = require("express");
const router = express.Router(); // Setting our min-app router
const controller = require("./controllers/controller");
const MulterData = require("../Multer");
const  DataValid = require("./.DataValid");

    
        // setup another route to listen on /about
    
      
        //--------------------------------------------------------------
        router.get("/", controller.renderHomePage);
        router.get("/Room_list",  controller.renderRoomListPage);
        router.get("/User_Registration", controller.renderRegisterPage);
        router.get("/login_admin_access",controller.renderAdminLoginPage);
        router.get("/login",controller.getRenderLoginPage);
        router.post("/login",DataValid.DataValidationLogin,controller.renderLoginPage);
        router.post("/User_Registration_data",DataValid.IsValidRegister , controller.registerInfo);
        router.get("/logout",controller.renderLogoutPage);
        router.get("/dashboard", controller.checkLogin,controller.checkAdminORUser);
        router.post("/dashboard",MulterData.single("images"),controller.UploadPhoto);
        router.post("/search",controller.search);
        router.post("/remove-photo/:filename",controller.deletePhoto);
        router.get("/Room_Description/:id",controller.Room_Description);
        router.post("/:id",controller.Booking);
        //--------------------------------------------------------------
    
    // Importing this router to 'express.js' file 
    module.exports = router;
  