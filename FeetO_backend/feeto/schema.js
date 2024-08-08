const Mongoose = require('mongoose')


const productItemsSchema = new Mongoose.Schema({
    name:String,
    price:String,
    image:{
        filename:String,
        data:Buffer,
        contentType: String,
    }
}, {collection: 'Items'})



const userDetailsSchema = new Mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{type:String, unique: true},
    password:String,
}, {collection: 'Users'})



const ordersSchema = new Mongoose.Schema({
    user:String,
    items:String,
    totalItemPrice:Number,
    address:String,
    phoneNumber:Number

}, {collection: 'Orders'})


 Mongoose.model('Items', productItemsSchema)
 Mongoose.model('Users', userDetailsSchema)
 Mongoose.model("Orders", ordersSchema)