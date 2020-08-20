const express = require("express");
const db = require('../data/dbConfig')

const Messages = require('./serverModel')
const server = express();


server.use(express.json());


const testObj = {
    rawr:'X3',
    nyan:'cat'
}
const toDelete = [
    {name:'an object'},
    {name:'another object'}
]

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/testing", (req, res) => {
    Messages.getAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({message:error.message})
        })
});

server.post('/testing', (req, res) => {
    const test = req.body
    if(!test.message){
        res.status(400).json({addition:'denied'})
    } else{
       Messages.insert(test)
            .then(ids => {                 
                res.status(201).json(ids[0])
            })
            .catch(error => {
                res.status(500).json({message:error.message})
            })
    }
})

server.delete('/testing/:id', (req, res) => {
    const id = req.params
    return db("test")
        .where({ id })
        .del()
        .then(response => {
            res.status(200).json({message:'deleted'})
        })
        .catch(error => {
            res.status(500).json({message:error.message})
        })
})

module.exports = server;
