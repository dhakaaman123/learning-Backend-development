const express = require("express");
const app = express();
const port = 8080;
app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);
});
app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let posts =[
    {   
        id:"123",
        username:"AmanDhaka",
        content:"I love coding"
    },
    {    
        id:"124",
        username:"SahilDhaka",
        content:"I love batting"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
   let {username,content,id} = req.body;
   posts.push({username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.send("request Working")
    
})

