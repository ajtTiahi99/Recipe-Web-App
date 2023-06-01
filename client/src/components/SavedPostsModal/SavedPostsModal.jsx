import {Modal,useMantineTheme} from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './SavedPostsModal.css'
import SavedPostCard from './SavedPostCard'


export const SavedPostsModal = ({modalOpened,setModalOpened}) => {
  const theme = useMantineTheme()
  const [savedPostArr,setSavedPostArr] = useState([])

  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${currentLoggedInUser}/saved`)
    .then(res=>setSavedPostArr(res.data))
    .catch(err=>console.log(err))
  },[])


  return (
    <Modal
      overlaycolor={theme.colorScheme==='dark'?theme.colors.dark[9] : theme.colors.gray[2]}
      overlayopacity={0.55}
      overlayblur={3}
      size="60%"
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
      centered
    >
      <div className="Modal">
        <span>{savedPostArr.length===0?'No Posts Saved':`Your Saved Posts. Total: ${savedPostArr.length}`}</span>
        <div className="ModalCards">
          {
            savedPostArr.map((postId,i) => {
              return  <SavedPostCard 
                        key={i}
                        id={postId}
                        parentDivName="Saved"
                      />
            }) 
          }
          
        </div>
      </div>
    </Modal>
  )
}

