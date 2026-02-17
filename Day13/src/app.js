const express = require("express");
const cookie_parser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")


const app = express();
app.use(express.json());
app.use(cookie_parser());

app.use("/api/auth",authRouter)

module.exports = app;