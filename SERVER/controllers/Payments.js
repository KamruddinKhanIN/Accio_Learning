const Course = require("../models/Course") ;
const User = require("../models/User") ;
const {mailSender} = require("../utils/mailer") ;
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail") ;
const Mongoose= require("mongoose") ;

// Capture The Payment and Initiate The Razorpay Payment\

exports.capturePayment= async(req,res)=>{
    try{
        const {courseId}= req.body;
        const userId= req.user.id;

        if(!courseId || !userId){
           return res.status(400)
           .json({
              success:false,
              message:"Fields Are Missing"
           })
        }


        let course;

        try{
            course= await Course.findById(courseId);

            if(!course){
                return res.status(404)
                .json({
                   success:false,
                   message:"Courese Not Found"
                })}
            
        //    Check id user has already purchased course or not
           
        const uid= new Mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(uid)){
            return res.status(403)
            .json({
                success:false,
                message:"Student Already Enrolled"
            })
        }
        }catch(err){
           return res.json({
            success:false,
            message:"Some Error Detected",
            err
           })
        }


        const price= course.price;
        const currency= "INR"

        // Create Order
        
        const options={
            amount: amount * 100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            // This notes will be used in verify signature fn to get course id and userid
            notes:{
                courseId,
                userId
            }
        }

        try{
            // Initiate Payment through Razorpay

            const paymentResponse= await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200)
            .json({
                successs:true,
                message:"Payment Succesfull",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })
            
        }catch(err){
            return res.status(400)
            .json({
                message:"Could Not Initiate Order",
                err
            })
        }

    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


// Now let's verify payment
exports.verifySignature= async (req,res)=>{
    try{
        const webhookSecret = "12345";

        const signature = req.headers["x-razorpay-signature"];


       const shasum =  crypto.createHmac("sha256",webhookSecret);

       shasum.update(JSON.stringify(req.body));

       const digest = shasum.digest("hex");


       if(signature===digest){
        console.log("Payment Is Authorised");

        const payload = req.body.payload.payment.entity.notes;


        const {userId, courseId}= payload;

        try{

        const enrolledCourse= await Course.findByIdAndUpdate(courseId,{
                $push:{
                    studentsEnrolled:userId
                 }
                },
                {new:true});
        
        if(!enrolledCourse){
            return res.status(404)
            .json({
                success:false,
                message:"Course Not Found"
            })
        }

        const enrolledUser = await User.findByIdAndUpdate(userId,{
        $push:{
           courses:courseId
         }
        },
        {new:true});

        console.log(first);

        const emailResponse = await mailSender(
            enrolledUser.email,
            `Congratulations! You have Been Successfully Enrolled In ${enrolledCourse.courseName}`,
            courseEnrollmentEmail)

        console.log(emailResponse);

        return res.status(200)
        .json({
           success:true,
           message:"Siganture Verified and Course Added"
        })




       }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Error While Enrolling Course Into DB"
        })
       }

       }

       else{
        return res.status(400)
        .json({
            success:false,
            message:"Signature Verification Failed"
        })
       }
       
    }catch(err){

    }
}
