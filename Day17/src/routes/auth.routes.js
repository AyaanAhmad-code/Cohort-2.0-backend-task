const express = require("express");
const Controller  = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.post("/register",Controller.registerController);
authRouter.post("/login",Controller.loginController)

module.exports = authRouter;