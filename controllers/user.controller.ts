import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
import { Pay } from 'twilio/lib/twiml/VoiceResponse';
// import userController from "../controllers/user.controller";
class UserController {
    // add api 
    async   register(req: Request, res: Response) {
        try {

            const {id} = req.body;
            await codeController.addNewUser({
                 id
                }, res)
        
                
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }


    // update user data 

    async update(req: Request, res: Response) {
        try {
            const {uniqueid,purchaseapp,playlable} = req.body;

            await codeController.updatedata({
                 uniqueid,purchaseapp,playlable
                }, res)
        
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }


    // add play time entry
     async addplaytime(req: Request, res: Response) {
        try {
            const {uniqueid,time} = req.body;
            await codeController.playtime({
               time,uniqueid

                }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }

// add show and click player data
async showdata(req:Request,res:Response){
    try{
  const{uniqueid,show,click,id}=req.body
  await codeController.clickdata({
    uniqueid,show,click,id
  },res)

    }catch(err){
        commonController.errorMessage("occuerd error",res)
    }
}

// get all particular data  from average time users
async getdata(req:Request,res:Response){
    try{

        await codeController.dataget({
          
        },res)
      
          }catch(err){
              commonController.errorMessage("occuerd error",res)
          }
      }

      


// admin login 
async adminlogin(req:Request,res:Response){
    try{
        const{email,password}=req.body;
        await codeController.adminlogin({
        email,password
        },res)
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}


 async userlogin(req:Request,res:Response){
    try{
        const{email,password}=req.body;
        await codeController.userlogin({
        email,password
        },res)
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}



// get all users 
async getuser(req:Request,res:Response){
    try{
        await codeController.getallusers({
    
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}

// get particular data conut
async gettotalcount(req:Request,res:Response){
    try{
    await codeController.getallcount({
    },res) 
}catch(error){
    
    commonController.errorMessage("occuerd error",res)
}
}

// 
async filteer(req:Request,res:Response){
    try{

        await codeController.filter({

        },res)

    }catch(error){
        commonController.errorMessage("occuerd error",res)
    }
}



// get all data from average table
async totaldata(req:Request,res:Response){
  try{
    const{id}=req.body;
    await codeController.getTime({
        id
        
    },res)
  }catch(error){
    commonController.errorMessage("occuerd error",res)
  }

}


// get total users 
async gettotalusers(req:Request,res:Response){
    await codeController.getusers({
        
    },res)

}




// change email adrees
async changeEmail(req:Request,res:Response){
    try{
      const{email,newemail,}=req.body;
      await codeController.changeEmail({
          email,newemail
      },res)
    }catch(error){
      commonController.errorMessage("occuerd error",res)
    }
  
  }



  
  // change password
  async Passwordchange(req:Request,res:Response){
    try{
        const{id,password,newPassword,}=req.body;
        await codeController.passwordchange({
        password,newPassword,id
        },res)
    }catch(error){
        commonController.errorMessage("occuerd error",res)
    }
  }

  


   
    async verify(req: Request, res: Response) {
        try {
            const {email,otp} = req.body;
            console.log(req.body)
                await codeController.verify({
                    email,otp
                }, res)
            
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }


    //  user login
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            await codeController.loginUser({
                email, password

            }, res)
        } catch (e) {
            commonController.errorMessage("user not login", res)
 
        }
    }


    //verify user
    async verifyCode(req: Request, res: Response) {
        try {
            var userId=req?.user?.id;
            const {  otp } = req.body;
            await codeController.verifyUser({
               userId, otp

            }, res)
        } catch (e) {
            commonController.errorMessage("not verify", res)

        }
    }



    
    //forgot Password
    async forgotPassword(req: Request, res: Response) {
        try {
            const { emailId } = req.body;
            await codeController.forgotPassword({
                emailId

            }, res)
        } catch (e) {
            commonController.errorMessage("emailId not found", res)

        }
    }

    //updatePassword
    async updatePassword(req: Request, res: Response) {
        try {
            const {  emailId,otp, password, confirmPassword } = req.body;

            if (password != confirmPassword) {
                commonController.errorMessage("Password Not Matched", res);
            }
            else {
                await codeController.updatePassword({
                     emailId,otp,password
                }, res)
            }

        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not update", res)
        }
    }

//

async newPassword(req: Request, res: Response) {
    try {
        const { emailId, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            commonController.errorMessage("Password Not Matched", res);
           
        }
       
        else {

            await codeController.newPassword({
                 emailId, password
            }, res)
        }


    } catch (e) {
        console.log(e)
        commonController.errorMessage("not update", res)
    }
} 


  // Get User By Id
  async getByUserId(req: Request, res: Response) {
    try {
        const { emailId } = req.body;
        await codeController.getByUserId({
            emailId

        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}

  // update profile
  async updateProfile(req: Request, res: Response) {
    try {
        const { emailId,fullName ,newemailId} = req.body;
        await codeController.updateProfile({
            emailId,
            fullName,
            newemailId

        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}

// change Password
async changePassword(req: Request, res: Response) {
    try {
        const { id, password ,newPassword} = req.body;
        await codeController.changePassword({
            id, password,newPassword

        }, res)
    } catch (e) {
        commonController.errorMessage("user not login", res)

    }
}
// get all users
async getAll(req: Request, res: Response) {
    
    try {
        
        await codeController.getAll({
           

        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}
// async test(req: Request, res: Response) {
    
//     try {
//          const{cc,phone}=req.body;
//         await codeController.test({
//            cc,phone

//         }, res)
//     } catch (e) {
//         commonController.errorMessage("user not get", res)
//         console.log(e);

//     }
// }
      // delete user
    
      async deleteUser(req: Request, res: Response) {
        try {
            const { emailId } = req.body;
            await codeController.deleteUser({
                emailId
    
            }, res)
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);
    
        }
    }

    //qr code

    async qrCode(req: Request, res: Response) {
        try {
           
            await codeController.qrCode({
            
    
            }, res)
        } catch (e) {
            commonController.errorMessage("qr code is not found", res)
            console.log(e);
    
        }
    }

    //IMAGE UPLOAD
    async postImage(req: Request, res: Response) {
        try {
            
            await codeController.postImage({
            
    
            }, res)
        } catch (e) {
            commonController.errorMessage("qr code is not found", res)
            console.log(e);
    
        }
    }

}


export default new UserController();