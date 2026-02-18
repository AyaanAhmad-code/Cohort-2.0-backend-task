const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:(isUserAlreadyExist.email == email ? "email is already exist" : "username is already exist")
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message: "user registered successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

async function loginController(req,res){
    const {email,username,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"no user found"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token);

    res.status(200).json({
        message:"user logged in successfully",
         user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}