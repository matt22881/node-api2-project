const cors = require('cors')
const server= require('./api/server')

require('dotenv').config()
const PORT = process.env.PORT || 5555

server.use(cors())

server.listen(PORT, () => {
    console.log(`API Server listening on port ${PORT}`)
})