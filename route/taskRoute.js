const express=require("express");
const {createTask,getAllTask,updateTask,deleteTask}=require("../controller/Task");

const Router=express.Router();

Router.post("/task/createtask",createTask);
Router.get("/task/getalltask",getAllTask);
Router.post("/task/updatetask",updateTask);
Router.delete("/task/deletetask",deleteTask);  
 
module.exports=Router;