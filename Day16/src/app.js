const express = require("express")
const cookie_parser = require("cookie-parser")
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");


const app = express();
app.use(express.json())
app.use(cookie_parser())

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)

module.exports = app;