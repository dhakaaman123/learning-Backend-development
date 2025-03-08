const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine","ejs");
app.listen(port,()=>{
    console.log(`app is listning on ${port}`);
});
app.use(express.static("public"))
app.set("views",path.join(__dirname,"/views"));
app.get("/home",(req,res)=>{
    res.render("home.ejs");
})
app.get("/search",(req,res)=>{
    res.send("hii this is aman dhaka");
})
app.get("/dice",(req,res)=>{
    let diceValue =  Math.floor(Math.random()*6)+1;
    res.render("dice.ejs",{diceValue});
})

app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("insta.ejs", { data });

    }
    else{
        res.render("error.ejs");
    }

    
})