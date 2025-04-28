import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

  function PostList({token,posts,onPostDeleted}){

  const deletePosts = async (id) =>{
    try{
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`,{headers: {
        'Authorization': `bearer ${token}`
      }})
      console.log(response);
      onPostDeleted();
    }
    catch(error){
      console.log(error);
    }
    
  }
  const[error,seterror] = useState("");
  return(
    <div className="min-h-100 mt-10 w-300 border-3 rounded-xl">
      <h1 className="text-2xl text-center font-bold mb-7">📚 All Posts</h1>
      {error && (
        <p className="text-xl text-center text-red-500 mb-4">{error}</p>
      )}
      {!error && posts.length === 0 ? <p className="text-2xl text-center">No posts to show, add post first</p> :(
        posts.map((post,id) => (
          <div className="h-fit w-full flex flex-row justify-between text-xl mb-3">
            <div key = {id} className="h-fit w-full border-gray-100 border-2 rounded-md shadow-2xl mr-5">
            <h1 className= "text-xl font-bold">Title: {post.title}</h1>
            <p className = "text-md text-wrap">{post.content}</p>
            </div>
            <button className = "h-12 w-20 p-2 bg-red-500 rounded-md mr-4 cursor-pointer" onClick =  {e => {deletePosts(post._id)}}>Delete</button>
          </div>
          
        ))
      )}
    </div>
  )
};
export default PostList;