
const User= require("../models/User");
const OTP= require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailer").mailSender;
const {passwordUpdate} = require("../mail/templates/passwordUpdate")


require("dotenv").config();


// Fn To Generate OTP
exports.sendOTP = async (req,res)=>{
    try{
            // Fetch Email OF USer
    const {email} = req.body;

    // Check if user already exists
    const checkUserPresent = await User.findOne({email});

    // If user already exists, then return a response
    if(checkUserPresent){
        return res.status(401).OTPjson({
            success:false,
            message:"User Already Registered"
        })
    }

    // generate otp
    var otp= otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });

    console.log("OTP Generated", otp);

    // check if unique otp or not
    const result = await OTP.findOne({otp:otp});

    while(result){
        otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        const result = await OTP.findOne({otp:otp});
    }

    const otpPayload = {email, otp};

    // Create an entry in OTP DB

    const otpBody= await OTP.create(otpPayload);
    console.log(otpBody);

    // Return the responsee 
 
    res.status(200)
    .json({
        success:true,
        message:"OTP Send Successfully"
    })

    }catch(err){
         console.log(err);
         res.status(500)
         .json({
            success:false,
            message:"Internal Server Error",
            err
         })
    }
}

// Sign Up Fn
exports.signUp = async (req,res)=>{
    
    try{
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNo, otp} = req.body;

        // Data Validation

        if(!firstName || !lastName || !email || !password || !confirmPassword
            || !otp){
                return res.status(403)
                .json({
                    success:false,
                    message:"Some Fields Are Missing"
                })
            }

            if(password!=confirmPassword){
                return res.status(400)
                .json({
                    success:false,
                    message:"Password & Confirm Password Do Not Match"
                })
            }

            const existingUser = await User.findOne({email});

            if(existingUser){
                return res.status(400)
                .json({
                    success:false,
                    message:"User Already Exists"
                })
            }

            // Getting OTP From DB
            const recentOtp= await OTP.find({email}).sort({createdAt:-1}).limit(1).exec();
            console.log(recentOtp);

            if(recentOtp.length == 0){
                return res.status(400)
                .json({
                    success:false,
                    message:"OTP Not Found"
                })
            }

            if (recentOtp.length === 0) {
                // OTP not found for the email
                return res.status(400).json({
                    success: false,
                    message: "The OTP is not valid",
                });
            } 

            if(otp !== recentOtp[0].otp){
                return res.status(400)
                .json({
                    success:false,
                    message:"OTP Not Match"
                })
            }

            //Hashing Password

            const hashedPassword= await bcrypt.hash(password,10);


            // Saving User TO DB

            // Creatign empty entry for additional details
            const profileData= await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNo:null
            })

            const user = await User.create({
                firstName,
                lastName,
                email,
                contactNo,
                password:hashedPassword,
                accountType,
                additionalDetails:profileData._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

            })


            return res.status(200)
            .json({
                success:true,
                message:"User Created Successfully",
                user
            })


    }catch(err){
         return res.status(500).
         json({
            success:false,
            message:"Internal Server Error"
         })
    }

}

// Login Fn

exports.login = async(req,res)=>{
    try{
        // Get data from req body

        const {email, password}= req.body;

        if(!email || !password){
            return res.status(403).
            json({
                success:false,
                message:"Fields Are Missing"
            })
        }

        const existingUser= await User.findOne({email}).populate("additionalDetails");

        if(!existingUser){
            return res.status(401).
            json({
                success:false,
                message:"User Not Registered. Please Sign Up First"
            })
        }


        if(await bcrypt.compare(password,existingUser.password)){

            const payload={
                email: existingUser.email,
                id: existingUser._id,
                role: existingUser.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            existingUser.token = token;

            existingUser.password= undefined;

            // Create cookie and send as response

            const options= {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("authToken", token, options).status(200).
            json({
                success:true,
                message:"Log In Succesfull"
            })
        }

        else{
            return res.status(401)
            .json({
                success:false,
                message:"Password Incorrect"
            })
        }
    }catch(err){
        res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err:err.message
        })
    }
}

// Change Password
exports.changePassword = async(req,res)=>{
    
    try{
    const {currentPassword, password, confirmPassword} = req.body;

    const email = req.body.email;

    if(!email || !currentPassword || !password || !confirmPassword){
        return res.status(401)
        .json({
            success:false,
            message:"Some Fields Are Msiing"
        })
    }

    const userData= User.findOne({email});

    if(!userData){
        return res.status(401)
        .json({
            success:false,
            message:"User Doesn't Exist"
        })
    }

    if(bcrypt.compare(currentPassword, userData.password))
    {
        
        if(password!=confirmPassword){
            return res.status(400)
            .json({
                success:false,
                message:"Password & Confirm Password Do Not Match"
            })
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const response = await User.findOneAndUpdate({email},{password:hashedPassword});
        

    }

    else{
        return res.status(401).
        json({
           success:false,
           message:"Current Password Do Not Match"
        })
    }


    	// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdate(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


    }catch(err){
        return res.status(500).
        json({
           success:false,
           message:"Internal Server Error"
        })
    }


}

