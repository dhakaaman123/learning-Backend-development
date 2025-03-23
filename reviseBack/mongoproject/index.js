const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const { error } = require("console");
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
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
main();

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
    try {
      
      res.render("new.ejs");
    } catch (error) {
      res.status(500).send("Error fetching chats: " + error.message);
    }
  });


  app.post("/chats/new", async (req, res) => {
    try {
      const { from, to, msg } = req.body;
  
      // Validate required fields
      if (!from || !to || !msg) {
        return res.status(400).send("All fields are required: from, to, and msg.");
      }
      let date1 = new Date();
  
      // Save chat to the database
      const newChat = await Chat.create({ from, to, msg , created_at:new Date()});
  
      console.log("New chat created:", newChat);
      res.redirect('/chats'); // Redirect to the chats page
    } catch (error) {
      console.error("Error creating chat:", error.message);
      res.status(500).send("Error creating chat: " + error.message);
    }
  });


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
  

// Start the Server
const port = 8080;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
