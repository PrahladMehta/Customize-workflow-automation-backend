const express=require("express");
const {signUp,logIn, sentOtp,}=require("../controller/Auth");

const Router=express.Router();
Router.post("/auth/signup",signUp);
Router.post("/auth/login",logIn);
Router.post("/auth/sentopt",sentOtp);


module.exports=Router;


