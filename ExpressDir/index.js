const express = require("express");
const app = express();
let port = 3000;
app.listen(port,()=>{
    console.log(`app listning on the port ${port}`);
});
// app.use((req,res)=>{
//     console.log("new incoming request");
//    // res.send("this is response towards u");
// });
app.get("/",(req,res)=>{
    res.send("you call root path");

});
app.get("/home",(req,res)=>{
    res.send("you contacted homem path");

});
app.get("/:username/:id",(req,res)=>{
    let{username,id}=req.params;
    res.send(`This account belongs to @${username}`);

});
app.get("/search",(req,res)=>{
    let{q}=req.query;
    if(!q){
        res.send("No search query");
    }
    res.send(`These are the results for :${q}`);
})
  
  
  