import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
var otpGenerator = require('otp-generator');
const QRCode = require('qrcode');
const multer = require('multer');
// unique id
const { uuidv4 } = require('uuid');
const crypto = require('crypto');














import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});


import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
// import { body, Result } from 'express-validator';
import { exists } from 'fs';
import { Encrypt } from '../common/encryptpassword';
import { error } from 'console';
import { TokenExpiredError } from 'jsonwebtoken';
import { ResolveOptions } from 'dns';
class CodeController {

    ///Section User Start
//   add api
async addNewUser(payload: any, res: Response) {
    const { id, uniqueid,purchaseapp } = payload;
    try {
        if (id === null || id === undefined) {
            const sun = commonController.generateString(6);
            const newUser = await db.Users.create({
                 uniqueid: sun,purchaseapp:true,
                 });
            commonController.successMessage(newUser, "Unique ID is created", res);

        } else {
            const foundUser = await db.Users.findOne({ 
                where: {
                 uniqueid: id 
                } 
            });
            if (foundUser) {
                commonController.successMessage(foundUser, "User information retrieved", res);
            } else {
                commonController.errorMessage("User not found", res);
            }
        }
    } catch (error) {
        console.error(error);
        return commonController.errorMessage("An error occurred", res);
    }
}


//update   purchaseapp and playlable users
async updatedata(payload:any,res:Response){
    const{uniqueid,purchaseapp,playlable}=payload;
    try{
        const sun=await db.Users.findOne({
            where:{
                uniqueid
            }
        })
        if(uniqueid){
            await sun.update({
                purchaseapp,playlable
            })
            commonController.successMessage(sun,"update data sucefuuly",res)
        }else{
            commonController.errorMessage("data not update sucefully",res)
        }
    }catch(error){
        commonController.errorMessage("occuerd err",res)
    }
}
    

// Add playtime data 
async playtime(payload: any, res: Response) {
    const { uniqueid,id, time} = payload;
    try {
        const sun=await db.Users.findOne({
            where:{
                uniqueid
            }
        })

       if(!sun){
       commonController.errorMessage("unique id not found",res) 
   }
      else{
        const newPlaytimeEntry = await db.Averagetime.create({
            userid:sun.id,
             time
        });

        commonController.successMessage(newPlaytimeEntry, "Playtime added successfully", res);
      }  
      
    } catch (error) {
        console.error(error);
        commonController.errorMessage("An error occurred", res);
    }
}

//  add show and click  data
async clickdata(payload:any,res:Response){
    const{uniqueid,show,click,id}=payload;
      try{
         const moon=await db.Users.findOne({
            where:{
                uniqueid
            }
         })
         if(!moon){
            commonController.errorMessage("unique id not found",res)
         }
            const sun=await db.Add.create({
                userid:moon.id,show,click
                })
             commonController.successMessage(sun," show and click data add ",res)
      
      }catch(err){
        commonController.errorMessage("occured error",res)
      }
}
    
        async verify(payload: any, res: Response) {
            try {
                const { email,otp} = payload;
                var sun = await db.Users.findOne({
                    where:{
                        email
                    }
                })
                   console.log(sun.id,"ss")
                var checkOtp = await db.UserOtps.findOne({
                    where: {
                        userId:sun.id,
                        active: true
    
                    }
                })
                console.log(checkOtp,"ss")
                if (checkOtp) {
                    if (checkOtp.otpValue == otp) {
    
                        await checkOtp.update({ active: false });
                        commonController.successMessage({}, "Otp Verified", res)
    
                    } else {
                        commonController.errorMessage("Invalid OTP", res)
                    }
                }
            } catch (e) {
                commonController.errorMessage;
            }
        }
    // login user

    async loginUser(payload: any, res: Response) {
        const { email, password } = payload;
        console.log(payload,"pa")
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                email

            }
        })

        if (checkdata) {
            if (await Encrypt.comparePassword(password.toString(), checkdata.password.toString())) {

                const token = jwt.sign({
                    email,
                    name: checkdata.fullName,
                    emailVerfied: checkdata.isEmailVerfied,

                }, process.env.TOKEN_SECRET);

                commonController.successMessage(token, "User login", res)
            } else {
                commonController.errorMessage("INvalid Details", res)
            }
        }
        else {
            commonController.errorMessage("Email password not match", res)
            console.log("no");


        }
    }
    // verify user

    async verifyUser(payload: any, res: Response) {
        try {
            const { id, otp } = payload;

            var checkOtp = await db.UserOtps.findOne({
                where: {
                    userId: id,
                    active: true

                }
            })

            if (checkOtp) {
                if (checkOtp.otpValue == otp) {

                    await checkOtp.update({ active: false });
                    commonController.successMessage({}, "Otp Verified", res)

                } else {
                    commonController.errorMessage("Invalid OTP", res)
                }
            }
        } catch (e) {
            commonController.errorMessage;
        }
    }

    //forgot Password

    async forgotPassword(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkEmailId = await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkEmailId) {
            //Generate Code
            var otp = commonController.generateOtp();
            console.log(otp);

            await db.UserOtps.create({
                otpValue: otp,
            })
            console.log(otp);
            await commonController.sendEmail(emailId, 'Your Email OTP To Reset Password', '<h1>Hi User  </h1><br> <p> Your email one time password (OTP) to reset password is ' + otp);
            commonController.successMessage(emailId, "link send  sucessfully", res)
        } else {
            console.log("not found");
        }
    }
    // // updatePassword

    async updatePassword(payload: any, res: Response) {
        try {
            const { emailId, otp, password } = payload;
            // console.log(payload)
            var checkOtp = await db.UserOtps.findOne({
                where: {

                    otpValue: otp

                }
            })
            console.log(checkOtp.otpValue, otp);
            if (checkOtp) {
                if (checkOtp.otpValue == otp) {

                    commonController.successMessage({}, "Otp Verified", res)


                }
                else {
                    commonController.errorMessage("Invalid OTP", res)

                }
            }
        } catch (e) {
            commonController.errorMessage;
        }
    }
    // new password

    async newPassword(payload: any, res: Response) {
        const { emailId, password } = payload;
        //Check If Email Exists

        var checkdata = await db.Users.findOne({
            where: {
                emailId,



            }
        })
        console.log(emailId);
        if (checkdata) {
            var hash = await Encrypt.cryptPassword(password.toString());

            var result = await checkdata.update({

                password: hash,

            })
            commonController.successMessage(emailId, "password update  sucessfully", res)




        } else {
            commonController.errorMessage("password not update", res)
            console.log("no");
        }
    }

    // get user by id

    async getByUserId(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {
            const token = jwt.sign({
                id: checkdata.id,
                emailId,
                name: checkdata.fullName,
                emailVerfied: checkdata.isEmailVerfied,
                is2FaEnabled: checkdata.is2FaEnabled,
                isPhoneVerfied: checkdata.isPhoneVerfied
            }, process.env.TOKEN_SECRET);
            console.log(token);
            commonController.successMessage(checkdata, "data get  sucessfully", res)

            console.log(checkdata);
        } else {
            commonController.errorMessage("data not get", res)
            console.log("no");
        }
    }

    // update profile
    async updateProfile(payload: any, res: Response) {
        const { emailId, fullName, newemailId } = payload;
        //Check If Email Exists

        var checkdata = await db.Users.findOne({
            where: {
                emailId
            }
        })
        if (checkdata) {
            var result = await checkdata.update({

                fullName,
                emailId: newemailId

            })
            commonController.successMessage(checkdata, "data updated sucessfully", res)
            console.log(checkdata.emailId);
        } else {
            commonController.errorMessage("data not update", res)
            console.log("not found");
        }
    }

    // change Password
   
    async changePassword(payload: any, res: Response) {
        const { id, password ,newPassword} = payload;
        var hash = await Encrypt.cryptPassword(password.toString());
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
            id

            }
        })

        if (checkdata) {
            console.log(checkdata);
          const check =await Encrypt.comparePassword(password.toString(), checkdata.password.toString())
          console.log(check);
            if (await Encrypt.comparePassword(password.toString(), checkdata.password.toString())) {
           
                var result = await checkdata.update({

                    
                    password : newPassword
    
                })
               console.log(hash);
                 console.log("ok ");
                 commonController.successMessage(id, "Password changed successfully", res)
                
            } else {
                commonController.errorMessage("INvalid Details", res)
            }
        }
        else {
            commonController.errorMessage("Email password not match", res)
            console.log("no");


        }
} 
        // find all users

        async getAll(payload: any, res: Response) {
            
            var checkdata = await db.Users.findAll({
                
            })
            if (checkdata) {
               
                commonController.successMessage(checkdata, "data get  sucessfully", res)
    
                // console.log(checkdata);
            } else {
                commonController.errorMessage("data not get", res)
                console.log("no");
            }
        }


        // async test(payload: any, res: Response) {
        //     const {cc,phone}=payload;
        //     console.log(payload,"pa") 
        //     client.messages.create({
        //         body: 'Hello from Node',
        //         to: '+916284507322',
        //         from: '+12345678901'
        //      }).then(message => console.log(message))
        //        // here you can implement your fallback code
        //        .catch(error => console.log(error))
           
        // }


       // delete user
       
       async deleteUser(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata= await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {
        
          
             var result =checkdata.destroy({
                where: {
                   emailId:emailId
                }
             }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
               if(rowDeleted === 1){
                  console.log('Deleted successfully');
                }
             }, function(err){
                 console.log(err); 
             });
            
            commonController.successMessage(checkdata, "data delete  sucessfully", res)
            console.log("data delete  sucessfully");
        
            
        } else {
            commonController.errorMessage("data not delete", res)
            console.log("not found");
        }
    }

    //qr code 

   async qrCode(payload: any, res: Response) {
  const generateQR = async (text) => {
    try {
      const dataUrl = await QRCode.toDataURL(text);
      console.log(dataUrl);
      commonController.successMessage(dataUrl, "QR code generated successfully", res);
    } catch (e) {
      commonController.errorMessage("Failed to generate QR code", res);
      console.log(e);
    }
  };

  await generateQR("http://google.com");
}
 

//post image
async postImage(req: any, res: any) {
  try{
    var response = `$(req.file.path)`;
    console.log(response,"hhhhhhhhhhhhh");
    if (response.match(/\.(png|jpg|jpeg)$/)) {
        await db.avatars.create(
            {
                avatar: "http://localhost:4000/" + response,
            
            },
            res
        );
    
    }
 
  
        commonController.successMessage(req.file.path, "image upload succesfully", res);
      } catch (e) {
        commonController.errorMessage("image not upload oops!", res);
        console.log(e);
      }
    }
}
  
  

export default new CodeController();
// export default new hello();
