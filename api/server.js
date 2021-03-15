const express = require('express')
const server = express()

server.use(express.json())

const router = require('./../routers/router')

server.use('/api/posts', router)

server.get('/', (req, res) => {
    res.status(200).send("Welcome to the API")
})

module.exports = server
