const express = require("express");
const app = express();
const port =8080;
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));



app.set(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.send("server is started and finalizing");

});
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);

});

