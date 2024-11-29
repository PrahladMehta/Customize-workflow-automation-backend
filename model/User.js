const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


 const userSchema=new mongoose.Schema({
            firstname:{
                  type:String,
                  required:true,
                  trim:true,
            },
            lastname:{
                  type:String,
                  required:true,
                  trim:true            
            },
            email:{
                  type:String,
                  required:true,
                  trim:true
            },
            profileImage:{
                  type:String,
                  default:"default.png",
                  trim:true
            },
            dateOfBirth:{
                  type:Date, 
            },
            password:{
                  type:String,
                  trim:true,
                  required:true,
            }

      },{
            timestamps:true
      })

      userSchema.pre('save',async function (next){ 

            if(this.isModified('password')){
                  this.password=await bcrypt.hash(this.password,10);
            }
            next();
      });

module.exports=mongoose.model("User",userSchema);