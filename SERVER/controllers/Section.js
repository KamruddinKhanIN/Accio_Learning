import Section from "../models/Section";
import Course from "../models/Course";

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
      ).populate("Section", populate("SubSection"));


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
            err
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

        const updatedSection= await Section.findByIdAndUpdate({sectionId},{sectionName:sectionName});

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
            err
        })
    }
};


exports.deleteSection= async(req,res)=>{
    try{
        // This time we find id from req params in url
        const {sectionId}= req.params;

        await Section.findByIdAndDelete({sectionId});

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
            err
        })
    }
}