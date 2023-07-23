const Section = require("../models/Section") ;
const Course = require("../models/Course") ;

exports.createSection = async(req,res)=>{
    try{
      const {sectionName, courseID}= req.body;

      if(!sectionName || !courseID){
        return res.status(400)
        .json({
           success:false,
           message:"Fields Are Missing"
        })
      }

      const newSection = await Section.create({sectionName});

      const updatedCourse= await Course.findByIdAndUpdate(
        courseID,
        {
            $push:{
                courseContent:newSection._id
            }
        },
        {new:true}
      ).populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        }});


      return res.status(200)
      .json({
        success:true, 
        message:"Section Created",
        updatedCourse
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

exports.updateSection= async(req,res)=>{
    try{
        const {sectionName, sectionId}= req.body;

        if(!sectionName || !sectionId){
            return res.status(400)
            .json({
                success:false,
                message:"Some Fields Are Missing"
            })
        }

        const updatedSection= await Section.findByIdAndUpdate({_id:sectionId},{sectionName:sectionName});

        return res.status(200)
        .json({
            success:true,
            message:"Section Updated",
            updatedSection
        })
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err:err.message
        })
    }
};


exports.deleteSection= async(req,res)=>{
    try{
        // This time we find id from req params in url
        const {sectionId, courseId}= req.body;

        await Section.findByIdAndDelete({_id:sectionId});

        await Course.findByIdAndUpdate({_id:courseId},
            {
                $pull:{
                    courseContent:sectionId
                }
            })

        return res.status(200)
        .json({
            success:true,
            message:"Section Deleted"
        })
    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err:errr.message
        })
    }
}