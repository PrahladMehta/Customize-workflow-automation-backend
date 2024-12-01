const Task=require("../model/Task");
const agenda=require("../agenda/agenda");


exports.createTask=async (req,res)=>{
      try{
            const {title,description,deadline,priority,userId}=req.body;
            if(!title&&!description&&!deadline&&!priority&&!userId){
                  return res.status(400).json({success:false,message:"Something went wrong "});
            }
            const task=await Task.create({title,description,deadline,priority,userId});
            const deadTime=new Date(deadline); 
            const schedulerTime=deadTime.getTime()+(10*1000);  
            const sentMailTime=new Date(schedulerTime);
            // await agenda.schedule(new Date(schedulerTime),'print',{a:12}); 
            await agenda.schedule(sentMailTime,'sent-mail',{taskId:task._id}); 
            return res.status(200).json({success:true,message:"Task created successfully ",task});
      }catch(error){
            console.log("ERROR"); 
            console.log(error); 
            res.status(400).json({success:false,message:"Error on createing task"});
            }
}



exports.getAllTask=async(req,res)=>{
      try{
            const {userId}=req.body;
            if(!userId){
                  return res.status(400).json({success:false,message:"something went wrong fetching task of user"});
            }
            const allTask=await Task.find({userId:userId});       
            return res.status(200).json({success:true,message:"task fetch of user",task:allTask});
      }catch(error){
            console.log("ERROR");
            console.log(error);
            return res.status(400).json({success:false,message:"something went wrong fetching task "});
      }
}



exports.deleteTask=async(req,res)=>{
      try{
           const {taskId}=req.body;
            if(!taskId){
               return res.status(400).json({
                        success:false,
                        message:"Missing task Id"
                  });
            }
            const task=await Task.findOneAndDelete({_id:taskId});
            console.log(task);
            return res.status(200).json({
                  success:true,
                  message:"Task deleted successfully"
            });
      }catch(error){
            console.log("ERROR");
            console.log(error);
      }
}

exports.updateTask=async(req,res)=>{
      try{
              const {taskId,title,description,deadline,priority,userId}=req.body;
                  
             if(!taskId||!title||!description||!deadline||!priority||!userId){
                  return res.status(400).json({success:false,message:"Update is not possible something is missing"});
             }
           const updated =await Task.findOneAndUpdate({_id:taskId},{title,description,deadline,userId,taskId,priority});
           console.log(updated);
            return res.status(200).json({success:true,message:"Task updated successfully"});
      }catch(error){
            console.log("ERROR");
            console.log(error);
            return res.status(400).json({success:false,message:"Fail on task update"});
      }
}