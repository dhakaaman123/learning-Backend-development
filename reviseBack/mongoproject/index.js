const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const { error } = require("console");
const ExpressError = require("./ExpressError");
const methodOverride = require("method-override")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
main();
function asyncWrap(fn){
  return function(req,res,next){
    fn(req,res,next).catch((err) =>next(err));
  }
}

// Routes
app.get("/", (req, res) => {
  res.send("Root is working");
});

app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
  } catch (error) {
    res.status(500).send("Error fetching chats: " + error.message);
  }
});


app.get("/chats/new", async (req, res) => {
    //  throw new ExpressError(404,"page not found");
      
      res.render("new.ejs");
    
  });


  app.post("/chats/new", asyncWrap(
    async (req, res) => {
  
      const { from, to, msg } = req.body;
  
      // Validate required fields
      // if (!from || !to || !msg) {
      //   return res.status(400).send("All fields are required: from, to, and msg.");
      // }
      let date1 = new Date();
  
      // Save chat to the database
      const newChat = await Chat.create({ from, to, msg , created_at:new Date()});
  
      console.log("New chat created:", newChat);
      res.redirect('/chats'); // Redirect to the chats page
  
  }
  ) );


  app.get("/chats/:id/edit", async(req,res)=>{
    try{
      
      const {id}=req.params;
     let chat = await Chat.findById(id);
     if(!chat){
      return  res.status(404).send("Chat not found");
     }
     res.render("edit.ejs",{chat});
     console.log(chat);

      
     

   }
   catch(err){
    console.error("Error creating :", err.message);
    res.status(500).send("Error creating chat"+ err.message )

   }
    
  });

  app.put("/chats/:id", async(req,res)=>{
    let {id}= req.params;
    let { msg:newmsg}= req.body;
    let updatedChat =  await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats")
  });


  app.delete("/chats/:id", async(req,res)=>{
    let {id}= req.params;
    let deletmsg = await Chat.findByIdAndDelete(id);
    console.log(deletmsg);
    res.redirect("/chats")
    
  });

  app.get("/chats/:id", asyncWrap(async(req,res,next)=>{

    let {id}= req.params;
    let chat = await Chat.findById(id);
    if(!chat){
      next(  new ExpressError(404,"chat not found"));
    
    }
    res.render("show.ejs",{chat});
    
 
 

}) )

const hValidationError = (err)=>{
  console.log("this is a validation eroor please follow rules");
  console.dir(err.message);
  return err;
};


app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name ==="ValidationError"){
      err = hValidationError(err);
    }
    next(err);
})

  // error handling middel

  app.use((err,req,res,next)=>{
    let {status=500,message="some Error Occured"}= err;
    res.status(status).send(message);
  })
  

// Start the Server
const port = 8080;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
