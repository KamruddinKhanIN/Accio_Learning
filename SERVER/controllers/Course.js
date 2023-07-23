const Course= require ("../models/Course");
const Category= require("../models/Category");
const User= require("../models/User");
const {uploadImageToCloudinary}= require("../utils/imageUploader");
require("dotenv").config();


exports.createCourse= async(req,res)=>{
      try{
        let {courseName, courseDescription, whatYouWillLearn, price,status,  category, tags}= req.body;

        const thumbnail= req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tags){
            return res.status(400)
            .json({
                success:false,
                message:"Some  Fields Are Missing"
            })
        }

        // Check for instructor id
        const userID=req.user.id;
        const instructorID= userID;

        if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userID, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

        console.log(instructorID);

        if(!instructorID){
            return res.status(404)
            .json({
                success:false,
                message:"Instructor Not Found"
            })
        }

        const categoryDetails= await Category.findById(category);

        if(!categoryDetails){
            return res.status(404)
            .json({
                success:false,
                message:"Category Not Found"
            })
        }

        // Upload Image To Cloudinary

        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.MEDIA_FOLDER);


        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            tags,
            thumbnail:thumbnailImage.secure_url
        })

        // add the new course to userSchema of instructor

        await User.findByIdAndUpdate({_id:instructorDetails._id},
                            {
                                $push:{
                                    courses:newCourse._id
                                }
                            },
                            {new:true});

                            
       
    //  Add course to category
       await Category.findByIdAndUpdate({_id:categoryDetails._id},
                           {
                            $push:{
                                course:newCourse._id
                            }
                           },
                           {new:true});


       return res.status(200)
       .json({
        success:true,
        message:"Course Created Successfully",
        newCourse
       });

      }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err:err.message
        })
      }
};

exports.showAllCourses= async (req,res)=>{
    try{
      const allCourses= await Course.find({},{courseName:true, price:true, thumbnail:true, instructor:true}).populate("instructor")
      .populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
      });

      return res.status(200)
      .json({
        success:true,
        message:"Data For All Courses Fetched Successfully",
        data:allCourses
      })

      
    }catch(err){
        console.log(err);
        return res.status(500).
        json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


exports.getCourseDetails = async (req,res)=>{
    try{
        const {courseId}= req.body;

        const courseDetails = await Course.findById(courseId)
        .populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails"
                }
            }
        )
        .populate("category")
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        )
        .populate("ratingsAndReviews").exec();

     
        
        if(!courseDetails){
            return res.status(404)
            .json({
                success:false,
                message:"Could Not Find Course With Given CourseId"
            })
        }


        return res.status(200)
        .json({
            success:true,
            message:"Course Fetched Successfully",
            courseDetails
        })


    }catch(err){
        return res.status(500).
        json({
            success:false,
            message:"Internal Server Error",
            err
        })
    }
}