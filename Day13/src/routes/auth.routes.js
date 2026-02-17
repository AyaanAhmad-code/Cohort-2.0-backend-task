const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt",token)

  res.status(201).json({
    message: "you are registered successfully",
    user,
    token
  });
});

authRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body;

    const User = await userModel.findOne({email})

    if(!User){
        return res.status(404).json({
            message:"User not found with this email address"
        })
    }

    const isPasswordMatch = User.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:User._id
    },process.env.JWT_SECRET)

    res.cookie("jwt",token)

    res.status(200).json({
        message: "user logged in",
        User,
    })
})

module.exports = authRouter;
