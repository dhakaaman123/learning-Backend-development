const express = require("express");
const app = express();
const port =8080;
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));
const { v4:uuidv4 } = require('uuid');
const methodOverride =require("method-override");
app.use(methodOverride("_method"));



app.use(express.static(path.join(__dirname,"public")));
let posts =[
    {
        id:uuidv4(),
        username:"AmanDhaka",
        content:"I love coding !"
    },
    {
        id:uuidv4(),
        username:"YashDhaka",
        content:"Iam currently doing Bpharma !"
    },
    {
        id:uuidv4(),
        username:"SachinDhaka",
        content:"Iam currently doing govt. job preparation!"
    }
];
app.get("/posts",(req,res)=>{
    // res.send("server is started and finalizing");
    res.render("index.ejs",{posts});

});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");

})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id ===p.id);
    console.log(post);
    res.render("show.ejs" ,{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent =req.body.content;
    let post =posts.find((p)=>id===p.id);
    post.content =newContent;
    console.log(post);
    res.redirect(`/posts`);
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id===p.id);
    console.log(post);
      
    res.render("edit.ejs",{post});

})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>p.id !==id);
    res.redirect(`/posts`);
})
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);

});   

