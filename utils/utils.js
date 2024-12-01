const nodemailer=require("nodemailer");
const Task=require("../model/Task");
const User=require("../model/User");


async function sendDeadlineMail(taskId){
      try{
      const task=await Task.findOne({_id:taskId});
      const user=await User.findOne({_id:task.userId});
      const email=user.email;
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
             subject: "Your task deadline ", 
             text: "Deadline of task is near",
             html: `<h1>Title :-${task.title}</h1>

              <p>Description:- ${task.description}</p>
            <p>Deadline:- ${task.deadline} </p>
             `, 
         };
         const info=await transporter.sendMail(mailOptions);
         console.log("Email sent successfully");
      }catch(e){
      console.log("ERROR");
      console.log(e);
      }
}

module.exports=sendDeadlineMail;