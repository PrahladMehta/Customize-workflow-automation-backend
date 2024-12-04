const express=require("express");
const {signUp,logIn, sentOtp,resetPassword,forgetPasswordSendMail}=require("../controller/Auth");


const Router=express.Router();
Router.post("/auth/signup",signUp);
Router.post("/auth/login",logIn);
Router.post("/auth/sentopt",sentOtp);
Router.post("/auth/resetpassword",resetPassword);
Router.post("/auth/forgetpasswordmailsend",forgetPasswordSendMail);

module.exports=Router;


