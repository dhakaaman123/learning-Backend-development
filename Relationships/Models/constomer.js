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


const orderSchema = new Schema({
    item:String,
    price :Number,


})

const costomerSchema = new Schema({
    name:String,
    order:[{ 
        type:Schema.Types.ObjectId,
        ref:"Order"

    },],

})

costomerSchema.post("findOneAndDelete",async(customer)=>{
    if(customer.order.length){
        let res =await Order.deleteMany({_id:{$in:customer.order}})
        console.log(res);
    }
  
})

const Order = mongoose.model("Order",orderSchema);

const Customer = mongoose.model("Customer",costomerSchema);

const findCustomer = async ()=>{
    // let res =  new Customer({
    //     name:"Ravi Dhounchak",
     
    // })
    // let order1 = await Order.findOne({item:"samosa"});
    // let order2 = await Order.findOne({item:"chips"});
    // res.order.push(order1);
    // res.order.push(order2);
    // let result = await res.save();


    // console.log(result);

    let result  = await Customer.find({}).populate("order");
    console.log(result);
}

// const addOrders = async ()=>{
//     let res = await Order.insertMany([
//         {item:"samosa",price:12},
//         {item:"chips",price:20},
//         {item:"Chocklate",price:100},

//     ]);
//     console.log(res);

// }

// addOrders();



// const addCust = async()=>{
//     let newCust = new Customer({
//         name:"karan Arjun"
//     });
//     let newOrder = new Order({
//         item:"pizza",
//         price:250,
//     })
//     newCust.order.push(newOrder);
//     await newOrder.save();
//     await newCust.save();
//     console.log("added new customer")
// }
// addCust();


let delCust = async()=>{
    let data = await Customer.findByIdAndDelete("67e80fb0807ec68c7b4020ab");
    console.log(data);
}
delCust();
