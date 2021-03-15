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
        .then(post => {
            if (!post){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else { 
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log('error with the request: ', req.body)
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.post('/:id/comments', async (req, res) => {
    const post_id = parseInt(req.params.id)
    const posts = await find()
    const post = posts.filter(post => post.id == post_id)
    if (!post[0]) {
        res.status(404).json( { message: "The post with the specified ID does not exist." })
    } else {
        if (!req.body.text) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else {
            const newComment = {
                text: req.body.text,
                post_id: post_id
            }
            insertComment(newComment)
                .then( post => {   
                    findCommentById(post.id)
                        .then(comment => {
                            res.status(201).json(comment)
                        })
                        .catch(err => {
                            console.log('err: ', err)
                            res.status(500).json({ error: "There was an error while reading the new comment from the database" })
                        })
                })
                .catch(err => {
                    res.status(500).json({ error: "There was an error while saving the post to the database" })
                })        
        }
    }
})
             
router.delete('/:id', async (req, res) => {
    const post_id = parseInt(req.params.id)
    const posts = await find()
    const post = posts.filter(post => post.id == post_id)
    if (!post[0]) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        remove(post_id)
            .then(resp => {
                res.status(204).json({message: "record deleted"})
            })
            .catch(err => {
                res.status(500).json({ error: "The post could not be removed" })
            })
    }
        
})

router.put('/:id', async (req, res) => {
    const post_id = parseInt(req.params.id)
    const posts = await find()
    const post = posts.filter(post => post.id == post_id)
    if (!post[0]) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        update(post_id, req.body)
        .then(updated => {
            if (updated === 1){
                findById(post_id)
                    .then(post => {
                        res.status(204).json(post)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The updated post information could not be retrieved." })
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})

module.exports = router
