const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs");

const client = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function createPostController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not provided unauthorized access"
        })
    }

    let decoded = null;
    
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"unauthorized access",
        })
    }

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test",
        folder:"Cohort2-0-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function getPostsController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not found UnAuthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"unauthorized access"
        })
    }

    const userId = decoded.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "post fetched successfully",
        posts
    })


}

async function getPostDetailsController(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token not found UnAuthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"unauthorized access"
        })
    }

    const userId = decoded.id;
    const postID = req.params.postID;

    const post = await postModel.findOne(postID);

    if(!post){
        return res.status(404).json({
            message: "No post found"
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }

    return res.status(200).json({
        message:"post details fetched successfully",
        post
    })
}



module.exports = {createPostController,getPostsController,getPostDetailsController}