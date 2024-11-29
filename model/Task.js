const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({      
         title:{
            type:String,
            required:true,
         },
         description:{
            type:String,
            required:true
         },
         deadline:{
            type:Date,
            required:true,
         },
         priority:{
            type:String,
            required:true,
         },
         userId:{
            type:mongoose.Schema.ObjectId,
            required:true,
         },
         alert:{
            type:Boolean,
            default:false,
         }

},{
      timestamps:true
});

module.exports=mongoose.model("Task",taskSchema);
