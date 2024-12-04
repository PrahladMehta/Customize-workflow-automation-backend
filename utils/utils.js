const nodemailer=require("nodemailer");
const Task=require("../model/Task");
const User=require("../model/User");
const { nanoid } = require('nanoid');

// import {nanoid} from "nanoid";


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
       
       
       // ... existing code ...
            const mailOptions = { 
            from: "prahladsingmehta22@gmail.com", 
            to: `${email}`, 
            subject: "Task Deadline Reminder", 
            text: "Deadline of task is near",
            html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                   <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                       <h1 style="color: #dc3545; margin: 0;">Task Deadline Reminder</h1>
                   </div>
                   
                   <div style="padding: 20px;">
                       <div style="margin-bottom: 20px;">
                           <h2 style="color: #333; margin-bottom: 10px;">Task Details</h2>
                           <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 10px;">
                               <strong style="color: #007bff;">Title:</strong>
                               <p style="margin: 5px 0;">${task.title}</p>
                           </div>
                           
                           <div style="background-color: #fff; padding: 15px; border-left: 4px solid #28a745; margin-bottom: 10px;">
                               <strong style="color: #28a745;">Description:</strong>
                               <p style="margin: 5px 0;">${task.description}</p>
                           </div>
                           
                           <div style="background-color: #fff; padding: 15px; border-left: 4px solid #dc3545;">
                               <strong style="color: #dc3545;">Deadline:</strong>
                               <p style="margin: 5px 0;">${task.deadline}</p>
                           </div>
                       </div>
                       
                       <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                           <p style="color: #666; font-size: 14px;">This is an automated reminder for your task deadline.</p>
                       </div>
                   </div>
               </div>
            `, 
     };
// ... existing code ...
     
      const info=await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      }catch(e){
      console.log("ERROR");
      console.log(e);
      }
}

exports.sendForgetMail=async(email)=>{

    try{
        const transporter=nodemailer.createTransport({
              service:"gmail",      
              auth:{
                 user:"prahladsinghmehta22@gmail.com",
                 pass:"vvvxoafzrelwkhuu"
              }
         });  
         const uid=nanoid();
         console.log(uid);
              const mailOptions = {
              from: "prahladsingmehta22@gmail.com", 
              to: `${email}`, 
              subject: "Task Deadline Reminder", 
              text: "Deadline of task is near",
              html: `
                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    ${uid}
                 </div>
              `, 
       }
       const info=await transporter.sendMail(mailOptions);
    }catch(e){
         console.log("Error on sending the email on ")
       }

}



module.exports=sendDeadlineMail;