import React, {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Register.css'


const Register = () => {

    const [confirmPassword,setConfirmPassword] = useState(true)
    const [fieldsFilled,setFieldsFilled] = useState(true)
    const UseNavigate = useNavigate()

    const [user,setUser] = useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e) => {
        setConfirmPassword(true)
        setFieldsFilled(true)
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const resetForm = () => {
        setConfirmPassword(true)
        setUser({
          userName:"",
          email:"",
          password:"",
          confirmPassword:""
        })
      }

    const goToLogin = () => {
      UseNavigate('/auth/login')
    }

    const handleRegister = async (e) => {
      e.preventDefault()
      const {userName,email,password,confirmPassword} = user

      if(userName && email && password && confirmPassword){
        setFieldsFilled(true)
        if(password===confirmPassword){
            setConfirmPassword(true)
            //use fetch or axios
            console.log("Creating new User: "+user)
            try{
              const userData = {
                userName,email,password,confirmPassword
              }
              const response = await axios.post('http://localhost:5000/auth/register', userData)
              console.log(response + " hey i am your success response")
              if(response){
                resetForm()
                goToLogin()
              }
            }catch(error){
              console.log(error)
            }
            
        }else{
          setConfirmPassword(false)
        }    
      }else{
        setFieldsFilled(false)
      }
    }

  return (
    <>
    <div className="container">
      <div className="MainBody">

        <div className="registerContainer glassEffect">
          <h1>Welcome</h1>

          <div className="form">
            <form method="POST"/>
              <span style={{display:fieldsFilled?"none":"block",color:"red",fontSize:"0.9rem"}}>*Please fill all the fields</span>

              <div className="inputContainer">
                  <label>Enter your name</label>
                  <input className="inputField" type="text" name="userName" value={user.userName} onChange={handleChange}/>
              </div>

              <div className="inputContainer">
                  <label>Enter Email</label>
                  <input className="inputField" type="text" name="email" value={user.email} onChange={handleChange}/>
              </div>

              <div className="inputContainer">
                  <label>Enter Password</label>
                  <input className="inputField" type="password" name="password" value={user.password} onChange={handleChange}/>
              </div>

              <div className="inputContainer">
                  <label>Confirm Password</label>
                  <input className="inputField" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
              </div>
              <span style={{display:confirmPassword?"none":"block",color:"red",fontSize:"0.9rem"}}>*Passwords are not same</span>
  
            <form/>
          </div>
          
          <button className="btn register" type="submit" onClick={handleRegister}>Register</button>
          <span>Already have an account? Go to Login</span>
          <button className="btn login" onClick={goToLogin}>Login</button>

        </div>
      </div>

    </div>
    </>
  )
}

export default Register
