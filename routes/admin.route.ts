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

const router=express.Router()

// admin api 
router.post("/getallusers",userController.getuser);


// getall count show and total click count of particular users
router.post("/getuserscount",userController.gettotalcount);


//get all data from average table
router.post("/gettotal",userController.totaldata);

// get  all user and get total users count and  get today USER
router.post("/getdatatotaluser",userController.gettotalusers);







//ssh -i card52.pem ec2-user@ec2-44-200-180-0.compute-1.amazonaws.com











 

    

export default router;

