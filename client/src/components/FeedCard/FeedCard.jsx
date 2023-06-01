import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import './FeedCard.css'
import RecipeIcon from '../../images/RecipeIcon.jpg'


const FeedCard = (props) => {

    const UseNavigate = useNavigate()
    const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')
    const [recipePic,setRecipePic] = useState(RecipeIcon)

    const data = {
        userId:currentLoggedInUser
    }
    const postIdData = {
        postId:props.PostId,
        userId:props.userId,
        title:props.title
    }

    const [liked, setLiked] = useState(props.likes.includes(data.userId))
    const [noofLikes,setnoofLikes] = useState(props.likes.length)
    const [postSavedArr,setPostSavedArr] = useState([])
    const [bookmarked, setBookmarked] = useState(postSavedArr.includes(postIdData.postId))


    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${data.userId}`)
        .then((res)=>setPostSavedArr(res.data.savedPosts))
        .catch((err)=>console.log(err))
    },[])

    const goToRecipe = (e) => {
        e.preventDefault()
        UseNavigate(`/post/${postIdData.postId}`)
    }

    const handleLike = async() => {
        setLiked((prev)=>!prev)
        liked?setnoofLikes((prev)=>prev-1):setnoofLikes((prev)=>prev+1)
        await axios.put(`http://localhost:5000/post/${postIdData.postId}/like`,data)  
    }

    const bookmarkPost = async() => {
        setBookmarked(!bookmarked)
        postSavedArr.includes(postIdData.postId)?postSavedArr.pop(postIdData.postId):postSavedArr.push(postIdData.postId)
        await axios.put(`http://localhost:5000/user/${data.userId}/save`,postIdData)     
        window.location.reload()
    }

    useEffect(()=>{
        //Firebase for RecipeImage
        const storage = getStorage();
        const recipeRef = ref(storage, `recipeImages/${postIdData.userId}/${postIdData.title}`)
        if(recipeRef===null)return
        // Get the download URL
        getDownloadURL(recipeRef)
        .then((url) => {
          setRecipePic(url)
        })
        .catch((error) => {console.log(error)})
    },[])

    
    return (
        <div className="Post">
            <img src={recipePic} alt="" />
            <div className="PostDesc">
                <a href="/"><span className="RecipeName" onClick={goToRecipe}>{props.title}</span></a>
                <div className="FeedDesc">
                    <div className="likes">
                        <span>
                            <i className={liked?"icon fa-solid fa-heart fa-lg ":"icon fa-regular fa-heart fa-lg"} onClick={handleLike}></i>
                        </span>
                        <span>{noofLikes}</span>
                    </div>
                    <div className="savedPost">
                        <span>
                            <i className={postSavedArr.includes(postIdData.postId)?"icon fa-solid fa-bookmark fa-lg":"icon fa-regular fa-bookmark fa-lg"} 
                                onClick={bookmarkPost}>
                            </i>
                        </span>
                    </div>
                    <div className="RecipeOrigin">
                        <span className="tag">{props.tag}</span>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FeedCard
