
const User= require("../models/User");
const OTP= require("../models/OTP");
const otpGenerator=require("otp-generator");


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

