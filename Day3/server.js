const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post('/notes',(req,res)=>{
    console.log(req.body);

    notes.push(req.body);

    res.send("Notes created");
})

app.get('/notes',(req,res)=>{
    res.send(notes);
})

app.listen(3000, ()=>{
    console.log("server is running on port no 3000")
})