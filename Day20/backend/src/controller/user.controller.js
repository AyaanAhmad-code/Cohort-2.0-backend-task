const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername == followeeUsername){
        return res.status(400).json({
            message:"You can not follow yourself"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({username:followeeUsername})

    if(!isUserAlreadyExist){
        return res.status(404).json({
            message:"user you are trying to follow does not exist"
        })
    }

    const isFollowerExist = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isFollowerExist){
        if(isFollowerExist.status === "pending"){
            return res.status(200).json({
            message:"You follow request sent to the user",
            follow: isFollowerExist
        })
        }
        if(isFollowerExist.status === "accepted"){
            return res.status(200).json({
            message:"You already followed the user",
            follow: isFollowerExist
        })
        }
        if(isFollowerExist.status === "rejected"){
            return res.status(200).json({
            message:"You request is rejected sent it again",
            follow: isFollowerExist
        })
        }
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message:`you are now following ${followeeUsername}`,
        followRecord
    })
}

async function unFollowUserController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message:"you are not following the user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeeUsername}`
    })
}

async function handleFollowRequest(req,res){
    const {status} = req.body;
    const followerUsername = req.params.username
    const followeeUsername = req.user.username;

    const request = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    });

    if(!request){
        return res.status(404).json({
            message:" Follow request not found"
        })
    }

    if(request.followee != followeeUsername){
        return res.status(403).json({
            message: "you are not authorized to respond to this request",
        })
    }

    if(status!=="accepted" && status!=="rejected"){
        return res.status(400).json({
            message:"Status must be either accepted or rejected"
        })
    }

    request.status = status;
    await request.save();

    res.status(200).json({
        message: `Follow request ${status}`,
        request
    });
}

module.exports = {
    followUserController,
    unFollowUserController,
    handleFollowRequest
}