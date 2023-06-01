import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Context/AuthContextProvider'
import './Login.css'

const Login = () => {

    const UseNavigate = useNavigate()
    const {getLoggedIn} = useContext(AuthContext)
    const [fieldsFilled,setFieldsFilled] = useState(true)

    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        setFieldsFilled(true)
        const {name,value} = e.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const goToRegister = () => {
      UseNavigate('/auth/register')
    }

    const handleLogin = async(e) => {
      e.preventDefault()
      const {email,password} = user

      if(email && password){
        setFieldsFilled(true)

        //using axios
        try{
          const loginData = {
            email,password
          }
          const loginRes=await axios.post('http://localhost:5000/auth/login', loginData)
          console.log(loginRes.data._id);
          localStorage.setItem("currentLoggedInUser",loginRes.data._id)

          const loggedInRes = await getLoggedIn()
          if(loggedInRes){
            console.log(loggedInRes)
            UseNavigate('/')
          }
          else{
            console.log("Could not log in");
          }
        }catch(error){
          console.log(error)
        }
      }
      else{
        setFieldsFilled(false)
      }
    }

    
  return (
    <div className="container">
      <div className="MainBody">
        <div className="loginContainer glassEffect">
          <h1>Welcome Back</h1>

          <div className="form">
            <form method="POST"/>
              <span style={{display:fieldsFilled?"none":"block",color:"red",fontSize:"0.9rem"}}>*Please fill all the fields</span>

              <div className="inputContainer">
                <label>Enter Email</label>
                <input className="inputField" type="email" name="email" value={user.email} onChange={handleChange}/><br/>
              </div>

              <div className="inputContainer">
                <label>Enter Password</label>
                <input className="inputField" type="password" name="password" value={user.password} onChange={handleChange}/><br/>
              </div>
            <form/>
          </div>
          
          <button className="btn login" onClick={handleLogin}>Login</button>
          <span>First time visiting? Go to Register</span>
          <button className="btn register" onClick={goToRegister}>Register</button>

        </div>
      </div>

    </div>
  )
}

export default Login
