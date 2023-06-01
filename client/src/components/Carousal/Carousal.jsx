import React from 'react'
import { motion } from 'framer-motion'
import { useRef,useEffect,useState} from 'react'
import './Carousal.css'
import { CardContent } from '../../Constants/CardContent'
import images from '../../Constants/images'

const Carousal = () => {

  const [width,setWidth] = useState(0)
  const carousal = useRef() 
  
  useEffect(()=>{
    setWidth(carousal.current.scrollWidth  - carousal.current.offsetWidth)
  },[])

  return (
    <div>
      <motion.div ref={carousal} className="carousal" whileTap={{cursor:"grabbing"}}>
        <motion.div drag="x" dragConstraints={{right:0,left:-width}} className="inner-carousal">
            {images.map((image,i)=>{
                return (
                    <motion.div className="item" key={i}>
                        <img src={image} alt="image"/>
                        <div className="item-content">
                          <h1>{CardContent[i].title}</h1>
                          <p>{CardContent[i].description}</p>
                        </div>
                    </motion.div>
                )
            })}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Carousal
