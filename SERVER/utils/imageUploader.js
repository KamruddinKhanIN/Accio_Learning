const cloudinary = require("cloudinary");

exports.uploadImageToCloudinary = async(file, folder, quality, height)=>{
    const options= {folder, resource_type:"auto"};
    if(height){
        options.height=height;
    }

    if(quality){
        options.quality=quality;
    }

    return await cloudinary.uploader.upload(file.tempFilepath, options);
}