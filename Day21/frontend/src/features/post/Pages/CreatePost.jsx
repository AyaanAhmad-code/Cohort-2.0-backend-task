import React,{useState,useRef} from 'react'
import "../style/createpost.scss"
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {

  const [caption, setCaption] = useState("")

  const postImageinputFieldRef = useRef(null)

  const {loading,handleCreatePost} = usePost()

  const navigate = useNavigate();


  async function handleSubmit(e){
    e.preventDefault();

    const file = postImageinputFieldRef.current.files[0];

    await handleCreatePost(file,caption)

    navigate("/")
  }

  if(loading){
    return (<main><h1>Creating Post...</h1></main>)
  }

  return (
    <main className='create-post-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className='post-image-label' htmlFor="postImage">Select Image</label>
          <input ref={postImageinputFieldRef} type="file" hidden name='postImage' id='postImage'/>
          <input value={caption} onChange={(e)=>{
            setCaption(e.target.value)
          }} type="text" name='caption' id='caption' placeholder='Enter Caption'/>
          <button className='button primary-button'>Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost
