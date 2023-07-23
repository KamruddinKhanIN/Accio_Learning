const User= require("../models/User");
const mailSender = require("../utils/mailer");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

exports.resetPasswordToken= async (req,res)=>{
    try{
            // Get User Email
    const {email} = req.body;

    if(!email){
        return res.status(401)
        .json({
            success:false,
            messsage:"Email Field Empty"
        })
    }

    const userData= await User.findOne({email});

    if(!userData){
        return res.status(401)
        .json({
            success:false,
            messsage:"User Not Registered"
        })
    }
    // Generate a token
    const token= crypto.randomUUID();

    // Store token in DB
    const updatedDetails = await User.findOneAndUpdate({email},{
        token:token,
        resetPasswordExpires:Date.now()+ 3600000,
    },{new:true});

    const url= `http://localhost:3000/update-password/${token}`;

    await mailSender(email, "Password Reset Link",`Pasword Reset Link: ${url}`);

    return res.status(200)
    .json({
        success:true,
        messsage:"Password Reset Mail Sent Successfully"
    })
    }catch(err){
        res.status(500)
        .json({
            success:false,
            messsage:"Internal Server Error",
            err:err.message
        })
    }
}

exports.resetPassword= async(req,res)=>{
   try{
    const {token, password, confirmPassword}= req.body;

    if(!token || !password || !confirmPassword){
        return res.status(401)
        .json({
            success:false,
            message:"Some Data Missing From Req Body"
        })
    }

    if (confirmPassword !== password) {
        return res.json({
            success: false,
            message: "Password and Confirm Password Does not Match",
        });
    }


    const userData = await User.findOne({token});

    if(!userData){
        return res.status(401)
        .json({
           success:false,
           message:"Token Is Invalid"
        })
    }


    if(userData.resetPasswordExpires < Date.now()){
        return res.status(403)
        .json({
            success:false,
            message:"Token Expired"
        })
    }

    // Hash Pass
    const hashedPassword= await bcrypt.hash(password,10);

    // password update at db
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    );

    return res.status(200)
    .json({
        success:true,
        message:"Password Reset Succesfull"
    })
   }catch(err){
      return res.status(500)
      .json({
        success:false,
        message:"Internal Server Error",
        err:err.message
      })
   }


}