import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import axios from 'axios'
import './RecipePage.css'
import RecipeIcon from '../../images/RecipeIcon.jpg'
import userImg from '../../images/userImg.png'
import { titleCase } from '../../Constants/titleCase.js'

const RecipePage = () => {

  const [post,setPost] = useState({})
  const [userData,setUserData] = useState('')
  const [userPic,setUserPic] = useState(userImg)
  const [recipePic,setRecipePic] = useState(RecipeIcon)
  let { id } = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:5000/post/${id}`)
    .then(res=>setPost(res.data))
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${post.userId}`)
    .then((res)=>setUserData(res.data))
    .catch((err)=>console.log(err))
  })


  //Firebase for ProfileImage
  const storage = getStorage()
  const profImgRef = ref(storage, `userImages/${post.userId}/profilePicture`)
  getDownloadURL(profImgRef)
  .then((url) => {
    setUserPic(url)
  })
  .catch((error) => {console.log(error)})

  //Firebase for RecipeImage
  const recipeImgRef = ref(storage, `recipeImages/${post.userId}/${post.title}`)
  getDownloadURL(recipeImgRef)
  .then((url) => {
    setRecipePic(url)
  })
  .catch((error) => {console.log(error)})    

  
  return (
      <div className="RecDetail">
        <div className="inner-wrapper">
           <div className="Heading">
                <img src={recipePic} alt="img" className="MainImg"/>
                <div className="MainRecipeInfo glassEffect">
                    <h1 className="title">{post.title}</h1>    
                    <ul>
                        {post.ingredients?.map((item,i)=>{
                          if(item!=''){
                            return <li key={i}>{titleCase(item)}</li>
                          }
                        })}
                    </ul>
                </div> 
           </div>
           <div className="instructions glassEffect">
                <h1>Directions</h1>
                <p>
                  {post.instructions}
                </p>
           </div>
           <div className="ownerInfo">
              <div>
                <img src={userPic} alt="ownerImg" className="ownerImg"/>
                <div className="ownerName">
                  <span>{userData.userName}</span>
                </div>
              </div>
              <div className="RecipeOrigin">
                <span className="tag">{post.tag}</span>
              </div>
           </div> 
        </div>
      </div>
  )
}

export default RecipePage
