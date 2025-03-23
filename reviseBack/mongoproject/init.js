const mongoose = require("mongoose");
main()
.then((res)=>{
    console.log("connection is sucessful");
})
.catch((err)=>{
    console.log(err);
})


async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    
}
const Chat = require("./models/chat");
let allChats =[
    {
        from:"Aman",
        to:"Anshika",
        msg:"send me notes for the exam DAA",
        created_at:new Date(),
    },
    {
        from:"Aman",
        to:"Anshika Malik",
        msg:"send me notes for the exam mathematics",
        created_at:new Date(),
    },
    {
        from:"Aman",
        to:"Aarish Khan",
        msg:"send me notes for the exam Operting system",
        created_at:new Date(),
    },
    {
        from:"Aman",
        to:"preeti",
        msg:"send me notes for the exam xyz",
        created_at:new Date(),
    },
    {
        from:"Aman",
        to:"kirti",
        msg:"send me notes for the exam COA",
        created_at:new Date(),
    },

];
Chat.insertMany(allChats)

