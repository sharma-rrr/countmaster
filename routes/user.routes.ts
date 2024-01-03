import { verify } from 'crypto';
import express from 'express';
 import userController from "../controllers/user.controller";

 const multer = require("multer");
 var storage = multer.diskStorage({
  destination: function (req: any, file:any, cb: any){
    cb(null, "profile");
  },
  filename: function(req:any, file: any, cb: any) {
    cb(null, file.originalname + ".png");

    
  },
 });
 var upload = multer({
  storage:storage
 })

const router=express.Router();
// add data 
 router.post("/register",userController.register);
 //update purchase app 
 router.post("/updatepurchaseapp",userController.update);
 // add average play time entry
 router.post("/addplaytime",userController.addplaytime);
 //add  play show and click
 router.post("/playshow",userController.showdata);

 // get all time count particular users try
 router.post("/get",userController.getdata);

 





 

 
 // ADMIN API'S
 // login api admin
 router.post("/adminlogin",userController.adminlogin);



 //login api admin user login
 router.post("/adminuserlogin",userController.userlogin);


 // change email
router.post("/changeemail",userController.changeEmail);


 // change password
router.post("/change",userController.Passwordchange);


//get  all  purchase app  data like one from users table
router.post("/getallusers",userController.getuser);


// getall count show and total click count of particular users
// and get all users data and total count  users and total today users count
router.post("/getuserscount",userController.gettotalcount);



router.post("/filter",userController.filteer);


   



 









 router.post("/verify",userController.verify);
   router.post("/login",userController.login);
   router.post("/forgot-Password",userController.forgotPassword);
   router.post("/updatePassword",userController.updatePassword);
   router.put("/newPassword",userController.newPassword);
   router.put("/updateProfile",userController.updateProfile);
   router.put("/changePassword",userController.changePassword);
   router.get("/getAll",userController.getAll);
   router.get("/delete",userController.deleteUser);
   router.post("/qrcode",userController.qrCode);
   router.post("/postimage",upload.single("profile"),userController.postImage);
  //  router.post("/getwallet",userController.addWallet);

  //  router.post("/test",userController.test);
 
    

export default router;

