const express = require("express");
const app = express();
const port =8080;
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));



app.use(express.static(path.join(__dirname,"public")));
let posts =[
    {
        id:"1a",
        username:"AmanDhaka",
        content:"I love coding !"
    },
    {
        id:"2b",
        username:"YashDhaka",
        content:"Iam currently doing Bpharma !"
    },
    {
        id:"3c",
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
    posts.push({username,content});
    res.redirect("/posts");

})
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id ===p.id);
    console.log(post);
    res.render("show.ejs" ,{post});
});
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);

});   

