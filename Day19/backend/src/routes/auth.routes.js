const express = require("express");
const Controller  = require("../controller/auth.controller");
const identifyUser = require("../middleware/auth.middleware")

const authRouter = express.Router();

authRouter.post("/register",Controller.registerController);
authRouter.post("/login",Controller.loginController);
authRouter.get("/get-me",identifyUser,Controller.getMeController)

module.exports = authRouter;