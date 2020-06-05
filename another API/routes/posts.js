const express = require('express');
const router = express.Router();
const Post = require('../models/posts')


// get all the post
router.get('/', async(req, res)=>{
    try{
        const post = await Post.find();
        res.json(post)
    }catch(err){
        res.json({message:err});
    }
})

// get single post
router.get('/:postId', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post)
    }catch(err){
        res.json({message:err});
    }
})

// delete a post
router.delete('/:postId', async(req, res)=>{
    try{
        const post = await Post.remove({_id: req.params.postId});
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
})

// update post
router.patch('/:postId', async(req, res)=>{
    try{
        const post = await Post.updateOne({_id:req.params.postId},{$set :{title: req.body.title}});
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
})

// save a post
router.post('/', async (req, res)=>{
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({message: err});
    // });
    try{
        const saved_posts = await post.save();
        res.json(saved_posts);
    }catch(err){
        res.json({message:err});
    }
})

module.exports = router;
