const RatingAndReview = require("../models/RatingAndReview") ;
const Course = require("../models/Course")  ;
const User = require("../models/User") ;
const mongoose = require("mongoose");



exports.createRating = async (req,res)=>{
    try{
       const {rating, review, course}= req.body;

       const userId= req.user.id;

       const checkEnrollment = await Course.findOne(
        {_id:course,
        studentsEnrolled: {$elemMatch: {$eq: userId} },
    });

       if(!checkEnrollment){
        return res.status(404)
        .json({
            success:false,
            message:"User Not Enrollled"
        })
       }

       const checkPreviouslyReviewed = await RatingAndReview.findOne({user:userId, course});
       
      
       if(checkPreviouslyReviewed){
        return res.status(403)
        .json({
            success:false,
            message:"Rating Already Given By User"
        })
       }

       const updatedRating= await RatingAndReview.create({user:userId, rating, review, course});
       

       await Course.findByIdAndUpdate(course,
        {
            $push:{
                ratingsAndReviews:updatedRating._id
            }
        },
        {new:true});

       return res.status(200)
       .json({
        success:true,
        message:"Review Saved",
        updatedRating
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



//getAverageRating
exports.getAverageRating = async (req,res)=>{
    try{
        const {courseId}= req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Typle.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"}
                }

            }
        ])


        // Return Rating

        if(result.length>0){
            return res.status(200)
            .json({
                success:true,
                message:"Average Rating Calculated",
                averageRating: result[0].averageRating
            })
        }

        else{
            return res.status(200)
            .json({
                success:true,
                message:"Average Rating 0",
                averageRating:0
            })
        }

         
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err:err.message
        })
    }
}

//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}

// get Specific Course Ratings
exports.getCourseRating = async (req, res) => {
    try{

        const {courseId} = req.body;
            const allReviews = await Course.find(courseId)
                                    .populate({
                                        path:"ratingsAndReviews",
                                        populate:{
                                            path:"user",
                                            select:"firstName lastName email image",
                                        }
                                       
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}