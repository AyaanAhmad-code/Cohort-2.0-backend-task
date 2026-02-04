const app = require("./src/app")
const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect("mongodb+srv://ay@cluster0.ylo7fxy.mongodb.net/DAY6").then(()=>{
        console.log("MongoDB connected")
    })
}
connectDB();

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})
