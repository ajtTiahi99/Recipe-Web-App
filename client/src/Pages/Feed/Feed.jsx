import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './Feed.css'
import { PostModal } from '../../components/PostModal/PostModal'
import ProfileOverViewLeftSide from '../../components/ProfileOverviewLeftSide/ProfileOverViewLeftSide'
import FeedCard from '../../components/FeedCard/FeedCard'


const Feed = () => {

  const [modalOpened,setModalOpened] = useState(false)
  const [postArr,setPostArr] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/post/feed')
    .then(res=>setPostArr(res.data))
    .catch(err=>console.log(err))
  },[])

  
    return (
      <>
        <div className="container">
          <div className="MainBody">
              <div className="leftDiv">
                <ProfileOverViewLeftSide/>
              </div>
              <div className="centralDiv">
                <div className="createPost glassEffect">
                  <span>Create a new post here...</span>
                  <button onClick={()=>setModalOpened(true)} className="btn">+ Create Post</button>
                  <PostModal
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                  />
                </div>
                <div className="feed glassEffect">
                  {
                    postArr.map((post,i) => {
                      return <FeedCard 
                                key={i} 
                                title={post.title} 
                                tag={post.tag} 
                                PostId={post._id}
                                likes={post.likes}
                                userId={post.userId}
                        />
                    }) 
                  }
                </div>
              </div>
              {/* <div className="rightDiv glassEffect"> */}
              {/* </div> */}
          </div>
        </div>
      </>
    )
}

export default Feed
