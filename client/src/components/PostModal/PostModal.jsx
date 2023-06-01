import { Modal,useMantineTheme } from '@mantine/core'
import axios from 'axios'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { storage } from '../../Constants/firebase'
import './PostModal.css'
import { titleCase } from '../../Constants/titleCase'
import RecipeIcon from '../../images/RecipeIcon.jpg'


export const PostModal = ({modalOpened,setModalOpened}) => {
  const theme = useMantineTheme()
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')


  const [postData,setPostData] = useState({
    userId:currentLoggedInUser,
    title:"",
    tag:"",
    instructions:"",
    ingredients:""
  })

  const [fieldsFilled,setFieldsFilled] = useState(true)
  const [recipeImage,setRecipeImage] = useState({RecipeIcon})
  const [recipeImageList, setRecipeImageList] = useState([])
  const imageListRef = ref(storage,"recipeImages/")

  const handleChange = (e) =>{
    const {name,value} = e.target
    setFieldsFilled(true)
    setPostData({
        ...postData,
        [name]:value
    })
  }
  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0])
  }

  function convertToArr(string){
    return string.split(',')
  }

  const handleCreatePost = async(e) => {
    e.preventDefault()
    var {userId,title,tag,instructions,ingredients } = postData

    if(title && tag && instructions && ingredients){
      setFieldsFilled(true)

      title = titleCase(title)
      tag = titleCase(tag)
      ingredients = convertToArr(ingredients)
      
      try{
        const updatePostData = {
          userId,
          title,
          tag,
          instructions,
          ingredients
        }
        //Posting data using axios
        await axios.post('http://localhost:5000/post',updatePostData)

        // Firebase code
        const imageRef = ref(storage,`recipeImages/${currentLoggedInUser}/${updatePostData.title}`)
        uploadBytes(imageRef,recipeImage).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((url)=>{
            setRecipeImageList((prev)=>[...prev,url])
          })
        })
        setModalOpened(false)
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
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setRecipeImageList((prev)=>[...prev,url])
        })
      })
    })
  },[])


  return (
    <Modal
      overlaycolor={theme.colorScheme==='dark'?theme.colors.dark[9] : theme.colors.gray[2]}
      overlayopacity={0.55}
      overlayblur={3}
      size="auto"
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
      centered
    >
      
    <form className="infoForm">
        <h2>Add New Recipe</h2>
        <span style={{display:fieldsFilled?"none":"block",color:"red",fontSize:"0.9rem"}}>*Please fill all the fields</span>
        <div className="NewRecipe">
            <div>
                <input className="infoInput" type="text" name="title" value={postData.title} placeholder="Enter Recipe Name..." onChange={handleChange}/>
            </div>
            <div>
                <input className="infoInput" type="text" name="tag" value={postData.tag} placeholder="Enter Cuisine Type(Indian, Chinese,French...)" onChange={handleChange}/>
            </div>
            <h4>Add Ingredients</h4>
            <div>
                <textarea rows="6" cols="47" className="infoInput" type="text" name="ingredients" value={postData.ingredients} placeholder="Enter Recipe Ingredients (Please enter comma separated values)..." onChange={handleChange}/>
            </div>
            <div>
                <textarea rows="6" cols="47" type="text" className="infoInput" name="instructions" value={postData.instructions} placeholder="Write Recipe Instructions..." onChange={handleChange}/>
            </div>
            <div className='filediv'>
                <label htmlFor="file" className="btn">Recipe Image</label>
                <input id="file" type="file" name="RecipeImage" onChange={handleImageChange}/>
            </div>
        </div>
        <button className="btn createBtn" onClick={handleCreatePost}>Create</button>
    </form>
    </Modal>
  )
}

