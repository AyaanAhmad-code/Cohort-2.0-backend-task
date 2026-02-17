const express = require("express");
const postRouter = express.Router();
const controller = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),controller.createPostController)
postRouter.get("/",controller.getPostsController)
postRouter.get("/details/:postID",controller.getPostDetailsController)

module.exports = postRouter;