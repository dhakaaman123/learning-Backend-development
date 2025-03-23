const mongoose = require('mongoose');

main()
 .then(()=>{
    console.log("connection sussessfull");
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
})

const User = mongoose.model("User",userSchema);
// const user1 = new User(
//     {
//         name:"hemant",
//         email:"hema@gmail.com",
//         age:20,
//     }
// )

// user1.save()
// .then((res)=>{
//     console.log(res);
// }) 
// .catch((err)=>{
//     console.log(err);
// }) 

// User.insertMany([
//     {
//         name:"kirti",email:"kirav@gmail",age:24,
//     },
//     {
//         name:"Ravi",email:"ravidhounchak@gmail",age:27,
//     },
//     {
//         name:"mohit",email:"mohitlath@gmail",age:22,
//     },
//     {
//         name:"abhimanyu",email:"abhi@gmail",age:18
//     }
// ]).then((data)=>{
//     console.log(data);
// })
User.findOneAndUpdate({name:"Ravi"},{age:24},{new:true}).then((res)=>{
    console.log(res);
})


