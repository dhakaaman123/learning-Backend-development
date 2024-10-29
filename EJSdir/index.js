const express = require("express");
const app = express();
const port =8080;
const path = require("path")


app.listen(port,()=>{
    console.log(`listening on port ${port}`)

});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.get("/",(req,res)=>{
    res.render("home.ejs");

});
app.get("/ig/:username",(req,res)=>{
    const followers=["adam","bob","steve","abc"]
    let {username}= req.params;
    res.render("instagram.ejs",{username});
})
app.get("/rolldice",(req,res)=>{
    let diceVal = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceVal});
})
app.get("/hello",(req,res)=>{
    res.send("hello");
});
