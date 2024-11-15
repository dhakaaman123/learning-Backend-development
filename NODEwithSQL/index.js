const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


let  getRandomUser = ()=> {
    return [
       faker.string.uuid(),
       faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password()
    ]
  };
  const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'989796'
  });
  app.get("/",(req,res)=>{
    let q =`SELECT  COUNT(*) FROM user `

    try{
      connection.query(q ,(err,result)=>{
        if(err) throw err;
        let count = result[0]['COUNT(*)'];
        console.log(count);
        res.render("home.ejs",{count});
        
      })
    }catch(err){
      console.log(err);
      res.send("some error in DB");
    
    }
  

  });

  app.get("/user",(req,res)=>{
    let q =`SELECT * FROM delta_app.user;`;

    try{
      connection.query(q ,(err,users)=>{
        if(err) throw err;
       
        res.render("showusers.ejs",{users});
       
      });
    }catch(err){
      console.log(err);
      res.send("some error in DB");
    
    }


  });


  app.get("/user/:id/edit",(req,res)=>{
    let {id}= req.params;
    let q = `select * fROM user Where id = '${id}'`;
    try{
      connection.query(q ,(err,result)=>{
        if(err) throw err;
        let user = result[0];
        console.log(user);
       
        res.render("edit.ejs",{user});
      });
    }catch(err){
      console.log(err);
      res.send("some error in DB");
    
    }
  })

  app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUsername} = req.body;
    let q = `select * fROM user Where id = '${id}'`;
    try{
      connection.query(q ,(err,result)=>{
        if(err) throw err;
        let user = result[0];
        if(formPass != user.PASSWORD){
          res.send("wrong Password"); 
        }else{
          let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
          connection.query(q2,(err,result)=>{
            if(err) throw err;
            res.redirect("/user");


          })
             

        }
      });
    }catch(err){
      console.log(err);
      res.send("some error in DB");
    
    }
    
    
  });

 
app.listen("8080", ()=>{
  console.log("server is listening to port 8080");
})
