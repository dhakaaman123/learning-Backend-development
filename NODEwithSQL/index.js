const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
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
  let q = "INSERT INTO user (id ,username,email,password) VALUES ?";
  // let users = [['123b','123_newuserb' , 'abc@gmail.comb','abcb'],['123c','123_newuserc' , 'abc@gmail.comc','abcc'],];
  let Data = [];
  for(let i=1;i<=100;i++){

    Data.push(getRandomUser());
  }


  try{
    connection.query(q,[Data] ,(err,result)=>{
      if(err) throw err;
      console.log(result);
    })
  }catch(err){
    console.log(err);
  }
