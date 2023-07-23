const Mongoose= require("mongoose");

const categorySchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
    },
    
    course:[
        {
        type:Mongoose.Schema.Types.ObjectId,
        ref:"Course"
         }
    ]
});

module.exports = Mongoose.model("Category", categorySchema);