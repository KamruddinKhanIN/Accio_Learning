import Profile from "../models/Profile";
import User from "../models/User";
import Course from "../models/Course";

exports.updateProfile= async(req,res)=>{
    try{
        const {gender, dateOfBirth, about, contactNo}= req.body;

        const id= req.body.user.id;

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
        
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
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

        await User.findByIdAndDelete({id});

        return res.status(200)
        .json({
            success:true,
            message:"User Deleted"
        })



    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error"
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