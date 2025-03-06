const express = require("express");
const app = express();
let port = 8080;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// Middleware to handle all incoming requests
// app.use((req, res) => {
//   console.log("New incoming request");
// //   res.send("<h1>Portfolio</h1>"); 
// });
app.get("/",(req,res)=>{
    res.send("you contacted root path");
});
app.get("/:username/:id",(req,res)=>{
    let{username,id}=req.params;
    res.send(`Welcome to the Account of ${ username}`);
})

app.get("/search",(req,res)=>{
    let {q}= req.query;
    res.send(`<h1>The search results for the ${q}</h1>`);
})


  

  
