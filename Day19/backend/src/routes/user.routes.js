const express = require("express");
const Controller  = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/follow/:username",identifyUser,Controller.followUserController)
userRouter.post("/unfollow/:username",identifyUser,Controller.unFollowUserController)
userRouter.post("/status/:username",identifyUser,Controller.handleFollowRequest)

module.exports = userRouter;