const jwt = require("jsonwebtoken");
require("dotenv").config();
const User= require("../models/User");


// Auth
exports.auth= async(req,res,next)=>{
    try{
        const token= req.cookies.authToken || req.body.authToken || 
        req.header("Authorisation").replace("Bearer ","");

        // If token is missing
        if(!token){
            return res.status(401)
            .json({
                success:false,
                message:"Token Missing"
            })
        }


        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode);

            req.user=decode;

            
        }catch(err){
            return res.status(401)
            .json({
                success:false,
                message:"Token Is Invalid"
            })
        }

        next();
    }catch(err){
        return res.status(401)
        .json({
            success:false,
            message:"Something Went Wrong While Verifying Token"
        })
    }
}

// isStudent Middleawre
exports.isStudent= async (req, res, next)=>{
    try{
      if(req.user.accountType !=="Student")
      {
        return res.status(401)
        .json({
            success:false,
            message:"Not A Student"
        })
      }

      next();
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"User Role Cannot Be Verified"
        })
    }
}

// isInstructor middleware
exports.isInstructor= async (req, res, next)=>{
    try{
      if(req.user.accountType !=="Instructor")
      {
        return res.status(401)
        .json({
            success:false,
            message:"Not A Student"
        })
      }

      next();
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"User Role Cannot Be Verified"
        })
    }
}

// isAdmin middleware
exports.isAdmin= async (req, res, next)=>{
    try{
      if(req.user.accountType !=="Admin")
      {
        return res.status(401)
        .json({
            success:false,
            message:"Not A Student"
        })
      }

      next();
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"User Role Cannot Be Verified"
        })
    }
}