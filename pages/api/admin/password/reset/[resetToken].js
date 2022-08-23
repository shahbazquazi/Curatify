import Blogger from "../../../../../models/bloggerModel";
import sendToken from "../../../../../utils/jwtToken";
import * as crypto from 'crypto';


export default async function resetPassword(req, res) {

    const { resetToken } = req.query;
   
     //Hash the token
     const resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex");
     //Find the user with the token
     const blogger = await Blogger.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() }
        });
     //If blogger not found show error
     if(!blogger){
         res.status(400).json({error: "Token has been expired"})
         return ;
     };
     // if blogger is found, Match the password with the confirm password   
     if (req.body.password !== req.body.confirmPassword){
        res.status(400).json({error: "Password and Confirm Password not matched"})
        return ;
     };
     // change the password
     blogger.password = req.body.password;
     // Change the value of resetPasswordToken and resetPasswordExpire
     blogger.resetPasswordToken = undefined;
     blogger.resetPasswordExpire = undefined;
     //Save the blogger
     await blogger.save();
     //Login the blogger
     sendToken(blogger,200,res);
} 