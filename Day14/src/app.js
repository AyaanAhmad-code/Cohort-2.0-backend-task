const express = require("express")
const cookie_parser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")

const app = express();
app.use(express.json());

app.use("/api/auth",authRouter)

app.use(cookie_parser());

module.exports = app;