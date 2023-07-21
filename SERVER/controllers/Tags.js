const Category= require("../models/Category");

exports.createCategory= async(req,res)=>{
    try{
        const {name, description}= req.body;

        if(!name || !description){
            return res.status(403)
            .json({
                success:false,
                message:"Some Fields are missing"
            })
        }


        const categoryDetails = await Category.create({name,description});

        return res.status(200)
        .json({
            success:"true",
            message:"Category Added",
            categoryDetails
        })

    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllCategories= async(req,res)=>{
    try{
        const getAllCategories= await Category.find({}, {name:true}, {description:true});

        res.status(200)
        .json({
            success:true,
            message:"All Categories Fetched",
            getAllCategories
        })

    }catch(err){
        return res.status(500)
        .json({
            success:false,
            message:err.message
        })
    }
}