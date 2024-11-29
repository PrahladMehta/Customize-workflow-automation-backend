const User= require("../model/User");
const Otp=require("../model/Otp");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const env=require("dotenv");
const nodemailer=require("nodemailer");


env.config();

exports.signUp=async (req,res)=>{

      try{
            const {firstname,lastname,email,password}=req.body; 
            if(!firstname&&!lastname&&!email&&!password){
                 return res.status(400).json({success:false,message:"Something is missing"});
            }

            const userCheck=await User.findOne({email});
            if(userCheck){
                  return res.status(400).json({success:false,message:"User already exists"});
            }
            const user=await User.create({firstname,lastname,email,password});

            if(!user){
                  return res.status(400).json({success:false,message:"Something went wrong"});
            }

            const token=jwt.sign({firstname,lastname,email,id:user._id},process.env.jwt_secret);
            res.cookie('token',token);
            return res.status(200).json({token,message:"User created succesfully"});

      }catch(error){
            console.log("Error on ")
            console.log(error);
            res.status(400).json({success:true,message:"Something went wrong on sign up"})
      }
}


exports.logIn=async(req,res)=>{

      try{
            const {email,password}=req.body;
            if(!email&&!password){
                  return res.status(400).json({success:false,message:"Something went wrong on log in "});
            }
            const user=await User.findOne({email});
            if(!user){
                  return res.status(400).json({success:false,message:"User not exists please sign up"});
            }
            const checkpassword=bcrypt.compare(password,user.password);
            if(!checkpassword){
                  return res.status(400).json({success:false,message:"Password are not matching "})
            }
            const token= jwt.sign({email:user.email,firstname:user.firstname,lastname:user.lastname},process.env.jwt_secret);

            res.cookie('token',token);
            
            return res.status(200).json({success:true,token,message:"Login successfully"});

      }catch(error){
            console.log("Error on ")
            console.log(error);
            res.status(400).json({success:true,message:"Something went wront on log in"})
      }
}



exports.sentOtp=async(req,res)=>{
      try{

            const {email}=req.body; 
            const otp=parseInt(Math.random()*1000000)+""
            if(!otp||!email){
                  return res.status(400).json({success:false,message:"Something went wrong"});
            }

            const transporter=nodemailer.createTransport({
                 service:"gmail",
             
                 auth:{
                    user:"prahladsinghmehta22@gmail.com",
                    pass:"vvvxoafzrelwkhuu"
                 }
            });

            const mailOptions = {
                  from: "prahladsingmehta22@gmail.com", 
                  to: `${email}`, 
                  subject: "OTP verification ", 
                  text: "Hello! This is a test email from Nodemailer.",
                  html: `<b>Hello!</b> This is a test email from Nodemailer.${otp}`, 
              };

            const info=await transporter.sendMail(mailOptions);
            const createOtp=await Otp.create({otp,email});    

            return res.status(200).json({success:true,message:"Otp created successfully"}); 
      }catch(error){
            console.log("Error");
            console.log(error);
            return res.status(400).json({success:false,message:"Error on otp sent"});
      }

}