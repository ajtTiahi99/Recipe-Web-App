import { Modal,useMantineTheme} from '@mantine/core'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { storage } from '../../Constants/firebase'
import { ref,uploadBytes,getDownloadURL,listAll } from 'firebase/storage'
import { titleCase } from '../../Constants/titleCase'
import './ProfileModal.css'


export const ProfileModal = ({PmodalOpened,setPModalOpened}) => {
  const theme = useMantineTheme()
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')

  const [fieldsFilled,setFieldsFilled] = useState(true)
  const [profilePicture,setProfilePicture] = useState(null)
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const userImageRef = ref(storage,"userImages/")

  const [coverPicture,setCoverPicture] = useState(null)
  const [coverPictureUrl, setCoverPictureUrl] = useState('')

  
  const [userData,setUserData] = useState({
    userName:"",
    description:"",
    location:""
  })

  const handleChange = (e) =>{
    setFieldsFilled(true)
    const {name,value} = e.target
    setUserData({
        ...userData,
        [name]:value
    })
  }
  
  const handleProfImgChange = (e) => {
    setProfilePicture(e.target.files[0])
  }
  const handleCovImgChange = (e) => {
    setCoverPicture(e.target.files[0])
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    var { userName, description,location} = userData
    if(userName && description && location){
      setFieldsFilled(true)
      userName = titleCase(userName)
      location = titleCase(location)
  
      try{
        const updateUserData = {
          currentUserId:currentLoggedInUser,
          userName,
          description,
          location
        }
        //Fetching data using axios
        await axios.put(`http://localhost:5000/user/${currentLoggedInUser}`,updateUserData)
  
        // Firebase code
        const profImageRef = ref(storage,`userImages/${currentLoggedInUser}/profilePicture`)
        const coverImageRef = ref(storage,`userImages/${currentLoggedInUser}/coverPicture`)
        if(profilePicture===null)return
        uploadBytes(profImageRef,profilePicture).then((snapshot)=>{
          alert('Profile Image uploaded')
          getDownloadURL(snapshot.ref).then((url)=>{
            setProfilePictureUrl(url)
          })
        })
        if(coverPicture===null)return
        uploadBytes(coverImageRef,coverPicture).then((snapshot)=>{
          alert('Cover Image uploaded')
          getDownloadURL(snapshot.ref).then((url)=>{
            setCoverPictureUrl(url)
          })
        })
        setPModalOpened(false)
        window.location.reload()
      }
      catch(error){
        console.log(error)
      }
    }
    else{
      setFieldsFilled(false)
    }  
  }

  useEffect(()=>{
    listAll(userImageRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setProfilePictureUrl(url)
        })
      })
    })
    listAll(userImageRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setCoverPictureUrl(url)
        })
      })
    })
    
  },[])
  
  return (
    <Modal
      overlaycolor={theme.colorScheme==='dark'?theme.colors.dark[9] : theme.colors.gray[2]}
      overlayopacity={0.55}
      overlayblur={3}
      size="50%"
      opened = {PmodalOpened}
      onClose = {()=>setPModalOpened(false)}
      centered
    >
      
    <form className="profInfoForm">
       <h3>Your Info</h3>
        <span style={{display:fieldsFilled?"none":"block",color:"red",fontSize:"0.9rem"}}>*Please fill all the fields</span>
        <div className="profInputs">
         <input type="text" className="infoInput" name="userName" value={userData.userName} placeholder="Enter Your Name" onChange={handleChange}/>
         <textarea rows="6" cols="50" maxLength={100} type="text" className="infoInput" name="description" value={userData.description} placeholder="About You (Max Characters: 100)..." onChange={handleChange}/>
         <input type="text" className="infoInput" name="location" value={userData.location} placeholder="Your Current Location" onChange={handleChange}/>
        </div>
        <div>
          <div>
            <label htmlFor="profileImage" className="btn">Profile Image</label>
            <input id="profileImage" type="file" name="profileImage" onChange={handleProfImgChange}/>
          </div>
          <div>
            <label htmlFor="coverImage" className="btn">Cover Image</label>
            <input id="coverImage" type="file" name="coverImage" onChange={handleCovImgChange}/> 
          </div>
        </div>
        <button className="btn" onClick={handleUpdate}>Update</button>
    </form>
    </Modal>
  )
}

