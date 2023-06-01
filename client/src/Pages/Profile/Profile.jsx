import React, { useEffect, useState } from 'react'
import './Profile.css'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import background from '../../images/background.jpg'
import { ProfileModal } from '../../components/ProfileModal/ProfileModal'
import SavedPostCard from '../../components/SavedPostsModal/SavedPostCard'
import ProfileOverViewLeftSide from '../../components/ProfileOverviewLeftSide/ProfileOverViewLeftSide'


const Profile = () => {

  const [PmodalOpened,setPModalOpened] = useState(false)
  const [coverPic,setCoverPic] = useState(background)
  let { id } = useParams()
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')
  const [savedPostArr,setSavedPostArr] = useState([])
  const [postsCreatedArr,setPostsCreatedArr] = useState([])
  

  //Fetching data using axios
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${currentLoggedInUser}/saved`)
    .then(res=>setSavedPostArr(res.data))
    .catch(err=>console.log(err))

    axios.get(`http://localhost:5000/user/${currentLoggedInUser}`)
    .then(res=>setPostsCreatedArr(res.data.postsCreated))
    .catch(err=>console.log(err))
  },[])

  //Firebase
  const storage = getStorage();
  const coverRef = ref(storage, `userImages/${currentLoggedInUser}/coverPicture`)

  // Get the download URL
  getDownloadURL(coverRef)
    .then((url) => {
      setCoverPic(url)
    })
    .catch((error) => {console.log(error)})
  
  
  return (
    <>
      <div className="container">
        <div className="MainBody">
          <div className="leftDiv">
            <ProfileOverViewLeftSide/>
          </div>
          <div className="ProfileRightSideView">
            <img className="CoverPic" src={coverPic} alt="CoverBg" />
            <hr />
            <div className="PostBody">
                <div className="PostBodyDiv1">
                  <i onClick={()=>setPModalOpened(true)} className="fa-sharp fa-solid fa-pen"></i>
                  <ProfileModal 
                    PmodalOpened={PmodalOpened}
                    setPModalOpened={setPModalOpened}
                  />
                  <span>Total Posts:{postsCreatedArr.length}</span>
                  <span><strong>Posts Created Here....</strong></span>
                </div>
                <div className="UserPosts">
                    <div className="ModalCards">
                      {
                        postsCreatedArr.map((postId,i) => {
                          return <SavedPostCard 
                                    key={i}
                                    id={postId}
                                    parentDivName="Profile"
                                 />
                        }) 
                      }
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
