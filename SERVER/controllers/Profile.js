const Profile = require("../models/Profile") ;
const User = require("../models/User") ;
const Course = require("../models/Course") ;
const { uploadImageToCloudinary } = require("../utils/imageUploader") ;
require("dotenv").config();

exports.updateProfile= async(req,res)=>{
    try{
        const {gender, dateOfBirth, about, contactNo}= req.body;

        const id= req.user.id;

 

        if(!id)
        {
            return res.status(403)
            .json({
                success:false,
                message:"User ID Missing"
            })
        }

        const userDetails= await User.findById(id);


        const profileId= userDetails.additionalDetails;

        const profiledetails= await Profile.findById(profileId);
        
        if(gender !== undefined){
            profiledetails.gender= gender;
        }

        if(dateOfBirth !== undefined){
            profiledetails.dateOfBirth= dateOfBirth;
        }

        if(about !== undefined){
            profiledetails.about= about;
        }

        if(contactNo !== undefined){
            profiledetails.contactNo= contactNo;
        }


        profiledetails.save();


        return res.status(200)
        .json({
            success:true,
            message:"Details Saved",
            profiledetails
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

// Delete Account

exports.deleteAccount= async(req,res)=>{
    try{
        const id = req.user.id;

        if(!id){
            res.status(403)
            .json({
                success:false,
                message:"User Not Found"
            })
        }

        const userDetails= await User.findById(id);

        if(!userDetails){
            return res.status(404)
            .json({
                success:false,
                message:"User Not Found"
            })
        }

        // Unenroll users from courses also
        userDetails.courses.forEach(async (courseId)=>{
            await Course.findByIdAndUpdate(courseId,
                {
                    $pull:{
                        studentsEnrolled:id
                    }
                });
        })




        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        await User.findByIdAndDelete({_id:id});

        return res.status(200)
        .json({
            success:true,
            message:"User Deleted"
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


exports.getAllUserDetails= async(req,res)=>{
    try{
        const id = req.user.id;

        if(!id){
            return res.status(400)
            .json({
                success:false,
                message:"User ID Missing"
            })
        }

        const userDetails = await User.findById(id).populate("additionalDetails");

        if(!userDetails){
          return res.status(404)
          .json({
            success:false,
            message:"User Not Found"
          })
        }

        return res.status(200)
        .json({
            success:true,
            message:"User Fetched Successfully",
            data:userDetails
        })
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPic = req.files.displayPic;
      console.log(displayPic)
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPic,
        process.env.MEDIA_FOLDER,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};