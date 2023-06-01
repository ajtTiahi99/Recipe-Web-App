import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Context/AuthContextProvider'

const LogOutBtn = () => {

  const UseNavigate = useNavigate()

  const {getLoggedIn} = useContext(AuthContext)

  async function logOut(){
    await axios.get("http://localhost:5000/auth/logout")
    await getLoggedIn()
    UseNavigate('/')
  }
  return (
      <button className="btn" onClick={logOut}>Log Out</button>
  )
}

export default LogOutBtn
