import express from "express";
import Post from "../models/Post.model.js";
import authHandler from '../middleware/auth.js'

const router = express.Router();
router.get('/', async (req,res) => {
  try{
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});


router.post('/', authHandler, async (req,res) => {
  const {title, content} = req.body;

  if(!title || !content){
    return res.status(400).json({"message" : "Content and title are required "});
  }
  try{
    const newPost = new Post({title, content})
    await newPost.save();
    res.status(201).json("post created successfully")
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id',authHandler, async(req,res)=>{
  const{id} = req.params;
  try{
    const deletedPost = await Post.findByIdAndDelete(id);

    if(!deletedPost){
      return res.status(404).json({message: "post doesn't exists"});
    }
    res.status(200).json({message: "Post deleted successfully"});
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
  
})

export default router;