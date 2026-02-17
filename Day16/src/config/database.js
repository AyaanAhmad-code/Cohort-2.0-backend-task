const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB Connected Successfully");
    })
}

module.exports = connectDB;