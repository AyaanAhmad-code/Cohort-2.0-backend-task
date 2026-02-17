const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;