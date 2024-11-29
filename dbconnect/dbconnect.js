const mongoose=require("mongoose")
const env=require("dotenv");
env.config();

 function dbconnect(){
    mongoose.connect(process.env.url).then(()=>console.log("mongodb connected")).catch(e=>console.log("error",e));
}


module.exports=dbconnect; 
 