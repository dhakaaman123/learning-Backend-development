const mongoose = require('mongoose');

main()
 .then(()=>{
    console.log("connection sussessfull");
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
  titel:{
    type:String,
    require:true,

  },
  author:{
    type:String,

  },
  price:{
    type:Number,
  },
  dicount:{
    type:Number,
    default:0 ,
  }
});

const Book =  mongoose.model("Book",bookSchema);
let book1 = new Book({
  titel:"CodeCreators",
  author:"Aman Dhaka",
  price:1000,

});
book1.save().then((res)=>{
  console.log(res);
})