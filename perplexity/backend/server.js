import app from "./src/app.js"
import "dotenv/config"
import connectDB from "./src/config/database.js"
import { testAPi } from "./src/services/ai.service.js";

connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})