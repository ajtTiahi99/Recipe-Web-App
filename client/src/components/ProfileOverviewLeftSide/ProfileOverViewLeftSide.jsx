import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import './ProfileOverViewLeftSide.css'
import { SavedPostsModal } from '../SavedPostsModal/SavedPostsModal'
import userImg from '../../images/userImg.png'

const ProfileOverViewLeftSide = () => {

  const [modalOpened,setModalOpened] = useState(false)
  const [userData,setUserData] = useState('')
  const [profilePic,setProfilePic] = useState(userImg)
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')

  const date = userData.createdAt
  const dateObject = new Date(date)
  
  // Extracting the date components
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDate()
  // Formatting the date
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`

  
  //Fetching data using axios
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${currentLoggedInUser}`)                 
    .then((response)=>{
      setUserData(response.data)
    })  
  },[])

  //Firebase
  const storage = getStorage();
  const profRef = ref(storage, `userImages/${currentLoggedInUser}/profilePicture`)

  // Get the download URL
  getDownloadURL(profRef)
    .then((url) => {
      setProfilePic(url)
    })
    .catch((error) => {console.log(error)})
  

  return (
    <div className="ProfileCard glassEffect">
      <div className="ProfileImages">
        <img src={profilePic} alt="userImg" className="userImg"/>
      </div>
      <div className="ProfileInfo">
        <h3>{userData.userName}</h3>
        <div className="desc">
          <p>
            {userData.description}
          </p>
        </div>
        <div>
          <div className="personInfo">
            <span><i className="fa-sharp fa-solid fa-location-dot"></i> Lives in : {userData.location}</span>
          </div>
          <div className="personInfo">
            <span><i className="fa-solid fa-calendar-days"></i> Joined on: {formattedDate}</span>
          </div>
          <div className="personInfo">
            <span>Saved Recipes</span>
            <button onClick={()=>setModalOpened(true)} className="btn infoBtn">Saved</button>
            <SavedPostsModal
                  modalOpened={modalOpened}
                  setModalOpened={setModalOpened}
                />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileOverViewLeftSide

