const express = require("express");

const server = express();

server.use(express.json());


const testObj = {
    rawr:'X3',
    nyan:'cat'
}


server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/testing", (req, res) => {

    res.status(200).json(testObj)
});

server.post('/testing', (req, res) => {
    const test = req.body

    if(!test.hello || !test.general){
        res.status(400).json({addition:'denied'})
    } else{
        res.status(201).json({data:test,this:'will make a fine addition to my collection'})
    }
})

server.delete('/testing', (req, res) => {

    res.status(204).end()
})

module.exports = server;
