import react from 'react'
import {useState,useEffect} from 'react';
import PostList from './components/Postlist';
import PostForm from './components/PostForm';
import axios from 'axios';

function App(){

  const[token,settoken] = useState('mysecrettoken')
  const[posts, setposts] = useState([])

  const getPosts = async () => {
    try{
      const response = await axios.get("http://localhost:5000/api/posts");
      setposts(response.data)
    }
    catch(err){
      seterror(err.message || "Something went wrong");
    }
  }
  
  useEffect(()=>{
    getPosts();
  },[]);

  return(
    <div className="w-full h-full mt-5">
      <h1 className="text-3xl text-center">📝 Mini Blog App</h1>
      <div className="w-full flex flex-row justify-around mt-10" >
        <PostForm token = {token} onPostCreated={getPosts}/>
        <PostList token = {token} posts = {posts} onPostDeleted={getPosts}/>
      </div>
      
    </div>
  )

};
export default App