const userModel = require("../models/user.model");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function register(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:(isUserAlreadyExist.email == email?"email already exist":"username already exist")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{
        expiresIn: "1d"
    })

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

async function login(req,res){
    const {email,password,username} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isPasswordMatch = user.password == crypto.createHash("sha256").update(password).digest("hex")

    if(!isPasswordMatch){
        return res.status(404).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            email:user.email,
        }
    })
}

module.exports = {
    register,
    login
}