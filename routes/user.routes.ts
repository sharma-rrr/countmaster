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
 router.post("/register",userController.register);
 //update purchase app 
 router.post("/updatepurchaseapp",userController.update);
 // add average play time entry
 router.post("/addplaytime",userController.addplaytime);
 //add  play show and click
 router.post("/playshow",userController.showdata);






 
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
