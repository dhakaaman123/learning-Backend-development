const mongoose = require("mongoose");
const {Schema}=mongoose;

main().then(()=>{
    console.log("connection is sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} 


const userSchema = new Schema({
    username:String,
    email:String,
});

const postSchema = new Schema({
    content :String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("post",postSchema);


const addData = async()=>{
    // let user1 = new User({
    //     username:"rahulKumar",
    //     email:"rahul@gmail.com",
    // });
    let user = await User.findOne({username:"rahulKumar"});

    let post2 = new Post({
        content:"This is 2nd post",
        likes:18
    });

    // user1.save();

    post2.user = user;
    await post2.save();

};

addData();