const mongoose= require("mongoose");
const mailSender = require("../utils/mailer");
const otpTemplate= require("../mail/templates/emailVerificationTemplate")

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    otp:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60, // The document will be automatically deleted after 5 minutes of its creation time
    }
});


async function sendVerificationEmail(email,otp){
    try{
       const maiLResponse= await mailSender(email,"Verification Email From Accio Learning",otpTemplate(otp));
       console.log("Email Send Succesfully: ", maiLResponse)
    }catch(err){
        console.log("Error Occured While Sending Mail", err);
        throw err;
    }
}

OTPSchema.pre("save", async function(next){

    if(this.isNew){
    await sendVerificationEmail(this.email, this.otp);
    }

    next();
})

module.exports = mongoose.model("OTP", OTPSchema);