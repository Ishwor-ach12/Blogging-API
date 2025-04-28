import {useState, useEffect} from 'react';
import axios from 'axios'
import PostList from './Postlist';

  function PostForm({token,onPostCreated}){

  const[message,setmessage] = useState('');
  const[title, setTitle] = useState('');
  const[content,setcontent] = useState('');
  
  const formhandler = async (e) => {
    e.preventDefault();
    await uploadPost();
  }

  const uploadPost = async () => {
    try{
      
      await axios.post('http://localhost:5000/api/posts', {title, content}, {headers: {
        'Authorization': `bearer ${token}`
      }})
      setmessage("✅ Post uploaded sucessfully")
      onPostCreated();
      setTitle('');
      setcontent('');
    }
    catch(err){
      setmessage("❌ unable to upload the post at this moment, try again in few seconds")
      setTitle('');
      setcontent('');
    }
  }

  return (
    <div className="min-h-70 h-fit p-5 border-3 rounded-2xl mt-10" >
      <h1 className="mb-5 text-2xl text-center font-bold">✍️ Create your post here</h1>
      <form onSubmit={formhandler} className="min-h-50 h-fit w-80 flex flex-col mb-5">
      <label htmlFor="Title" className="text-xl">Title</label>
      <input 
        id='Title'
        type='text'
        placeholder='Enter title for your post'
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className='h-8'
      />
      <label htmlFor="Content" className="text-xl mt-5">Content</label>
      <textarea
        id='Content'
        type='text'
        placeholder='Enter your content here'
        value = {content}
        onChange = {(e) => setcontent(e.target.value)}
        required
        rows={3}
        className="mt-4"
      />
      <button type="submit" className="bg-green-500 h-10 w-27 p-2 rounded-xl mt-5 cursor-pointer">Create Posts</button>
      </form>
      <p className="tet-xl">{message}</p>
    </div>
    
  ) 
};
export default PostForm;