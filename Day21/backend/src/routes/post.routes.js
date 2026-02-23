const express = require("express")
const postRouter = express.Router();
const multer = require("multer");
const Controller = require("../controller/post.controller");
const identifyUser = require("../middleware/auth.middleware");
const upload = multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),identifyUser,Controller.createPostController);
postRouter.get("/",identifyUser,Controller.getPostController)
postRouter.get("/details/:postId",identifyUser,Controller.getPostDetailsController)
postRouter.post("/like/:postId",identifyUser,Controller.likePostControlller)
postRouter.get('/feed', identifyUser,Controller.getFeedController)

module.exports = postRouter;