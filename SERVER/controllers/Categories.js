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
};

// Category Page Details

exports.categoryPageDetails = async(req,res)=>{
    try{
        // Get Category Id
        const {categoryId}= req.body;

        const selectedCategory= await Category.findById(categoryId).populate("courses").exec();

        if(!categoryId){
            return res.status(404)
            .json({
                success:false,
                message:"Empty Category"
            })
        }

        const differentCategories = await Category.find({
            _id: {$ne: categoryId},
            })
            .populate("courses")
            .exec();

        //get top 10 selling courses
        //HW - write it on your own 
        
        
        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
                  },
        });
    }catch(err)
    {
        return res.status(500)
        .json({
            success:false,
            message:"Internal Server Error",
            err
        })
    }
}