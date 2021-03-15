const express = require('express')
const router = express.Router()

const { find, findById, insert, update, remove, findPostComments, findCommentById, insertComment } = require('./../data/db.js')

router.get('/', (req, res) => {
    find()
    .then(posts => {
        if (!posts){
            res.status(404).json({message: "The posts were not found"})
        } else {
            res.status(200).json(posts)
        }
    })
    .catch (err => {
        console.log('err: ', err, '\n ---end err--- \n')
        res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
            res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })

    
})

router.get('/:id/comments', (req, res) => {
    findPostComments(req.params.id)
        .then(comments => {
            if (!comments){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else { 
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

module.exports = router