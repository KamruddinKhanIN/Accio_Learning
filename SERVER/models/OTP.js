const mongoose= require("mongoose");
const mailSender = require("../utils/mailer").mailSender;
const {emailTemplate}= require("../mail/templates/emailVerificationTemplate")

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    otp:{
        type:String,
        required:true
    },

    createAt:{
        type:Date,
        default:Data.now(),
        expires: 5*60, // The document will be automatically deleted after 5 minutes of its creation time
    }
});


async function sendVerificationEmail(email,otp){
    try{
       const maiLResponse= await mailSender(email,"Verification Email From AccioLearning",emailTemplate(otp));
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