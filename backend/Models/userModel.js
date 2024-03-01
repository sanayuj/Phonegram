const mongoose=require("mongoose")

const userModel=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:3,maxlength:30
    }
})

const userSchema=mongoose.Model("User",userModel)
module.exports=userSchema