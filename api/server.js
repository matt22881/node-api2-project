const express = require('express')
const server = express()

server.use(express.json())

const { 
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment 
} = require('./../data/db.js')

server.get('/posts', (req, res) => {
    find()
    .then(posts => {
        console.log('posts: ', posts, '\n ---end posts--- \n')
        res.status(200).json(posts)
        })
        .catch (err => {
        console.log('err: ', err, '\n ---end err--- \n')
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})
module.exports = server
