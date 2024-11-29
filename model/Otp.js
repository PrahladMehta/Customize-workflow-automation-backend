const mongoose=require("mongoose");


const otpSchema=new mongoose.Schema({
      otp:{
            type:String,
            required:true,
      },
      email:{
            type:String,
            required:true
      }
},{
      timestamps:true,
      expires:300
});

otpSchema.index({createdAt:1},{expireAfterSeconds:300});


module.exports=mongoose.model("Otp",otpSchema);