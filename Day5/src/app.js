const express = require("express");

const app = express();

app.use(express.json());
const notes = [];

app.post('/notes',(req,res)=>{
    notes.push(req.body);

    res.status(201).json({
        message: "Notes created Successfully"
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes: notes
    })
})

app.delete('/notes/:id',(req,res)=>{
    delete notes [req.params.id]

    res.status(204).json({
        message: "Notes Deleted Successfully"
    })
})

app.patch('/notes/:id',(req,res)=>{
    notes[req.params.id].title = req.body.title

    res.status(200).json({
        message:"Notes updated successfully"
    })
})

module.exports = app;