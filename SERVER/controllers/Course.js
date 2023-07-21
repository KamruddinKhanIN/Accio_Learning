const Course= require ("../models/Course");
const Category= require("../models/Category");
const User= require("../models/User");
const {uploadImageToCloudinary}= require("../utils/imageUploader");


exports.createCourse= async(req,res)=>{
      try{
        const {courseName, courseDescription, whatYouWillLearn, price, category}= req.body;

        const thumbnail= req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400)
            .json({
                success:false,
                message:"Some  Fields Are Missing"
            })
        }

        // Check for instructor id
        const userID=req.user.id;
        const instructorID= userID;

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

        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.THUMBNAIL_FOLDER);


        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructor:instructorID._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url
        })

        // add the new course to userSchema of instructor

        await User.findById({_id:instructorID._id},
                            {
                                $push:{
                                    courses:newCourse._id
                                }
                            },
                            {new:true});
       
    //  Add course to category
       await Category.findById({category},
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
            err
        })
      }
};

exports.showAllCourses= async (req,res)=>{
    try{
      const allCourses= await Course.find({},{courseName:true, price:true, thumbnail:true, instructor:true}).populate("instructor");

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