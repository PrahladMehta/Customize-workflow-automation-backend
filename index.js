const express=require("express");
const dbconnect=require("./dbconnect/dbconnect");
const env=require("dotenv");
const cors=require("cors");
const Agenda=require("./agenda/agenda")
//Router import 
const authRouter=require("./route/authRoute");
const taskRouter=require("./route/taskRoute");
env.config();

const app=express();
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}));




app.listen(process.env.port,async ()=>{
      console.log("listen on",process.env.port);
})

// Agenda.schedule('in 10 seconds','print');
      


app.use("/api/v1",authRouter);  
app.use("/api/v1",taskRouter);      



dbconnect(); 