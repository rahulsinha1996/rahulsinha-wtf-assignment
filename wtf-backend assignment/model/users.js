const mongoose=require('mongoose');
const uuid = require('react-uuid');
const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    first_name:String,
    last_name:String,
    email:String,
    mobile:String,
    password:String,
    role:String,
    status:String


})
module.exports=mongoose.model('users',userSchema)