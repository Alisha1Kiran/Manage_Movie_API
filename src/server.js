const express = require('express');
const server = new express
const movieRoute = require('./route/moviesRoute')

server.use(express.json())
server.use('/movies', movieRoute)

server.get('/', (req, res) => {
    res.send("Hello !")
})


server.listen(4200, () => {
    console.log("Server running on port 4200")
})
