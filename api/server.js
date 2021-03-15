const express = require('express')
const server = express()

server.use(express.json())

const router = require('./../routers/router')


server.use('/api/posts', router)


module.exports = server
