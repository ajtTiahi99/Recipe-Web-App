import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import axios from 'axios'
import './SavedPostsModal.css'
import RecipeIcon from '../../images/RecipeIcon.jpg'


const SavedPostCard = (props) => {

  const UseNavigate = useNavigate()
  const location = useLocation()
  const [postData,setPostData] = useState({})
  const [recipePic,setRecipePic] = useState({RecipeIcon})
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')

  const data = {
    userId:currentLoggedInUser
  }

  useEffect(()=>{
    axios.get(`http://localhost:5000/post/${props.id}`)
    .then(res=>setPostData(res.data))
    .catch(err=>console.log(err))
  },[])
  
  const handleDelete = async(e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:5000/post/${props.id}`,{data: {data}})
    window.location.reload()
  }

  const goToRecipe = (e) => {
    e.preventDefault()
    UseNavigate(`/post/${props.id}`)
  }
  

  //Firebase for RecipeImage
  const storage = getStorage()
  const recipeRef = ref(storage, `recipeImages/${postData.userId}/${postData.title}`)

  // Get the download URL
  getDownloadURL(recipeRef)
  .then((url) => {
    setRecipePic(url)
  })
  .catch((error) => {console.log(error)})


  return (
    <div className="card">
      <img src={recipePic} alt="img" className="card_img"/>
      <div className="card_body">
        <h3 className="card_title">{postData.title}</h3>
        <div className="card_lower">
          <button className="btn" onClick={goToRecipe}>View Recipe</button>
          {props.parentDivName==="Profile" && <i className="fa-solid fa-trash deleteIcon" onClick={handleDelete}/>}
          {/* {props.parentDivName==="Saved" && <i className="icon fa-solid fa-bookmark fa-lg" onClick={bookmarkPost}/>} */}
        </div>
      </div>
    </div>
  )
}

export default SavedPostCard
