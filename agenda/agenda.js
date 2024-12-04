const Agenda = require("agenda");
const sendDeadlineMail=require("../utils/utils");

const agenda = new Agenda({
  db: {
    address: "mongodb+srv://prahladsinghmehta22:7nKLKu6jxVTJFz91@cluster0.2hqna.mongodb.net/Customize-Workflow-Automation?retryWrites=true&w=majority",
    collection: 'jobs',
  },
});

//immediately invoke  function expression (iife)

(async function () {
  try { 
    await agenda._ready;
    // agenda.define("print", async (job) => {
    //   const {a}=job.attrs.data;
    //   console.log("hello",a);
    // });

    agenda.define("sent-mail",async(job)=>{
        const {taskId}=job.attrs.data;       
        sendDeadlineMail(taskId);  
    })


    await agenda.start();
    console.log("Agenda Started");
    // await agenda.schedule('in 10 seconds', 'print');
  } catch (error) {
    console.error("Error starting Agenda:", error);
  }
})();


module.exports = agenda;   