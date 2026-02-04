const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("MongoDb Connected Successfully");
    })
}

module.exports = connectDB;