import React, { useContext, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../Context/AuthContextProvider'
import LogOutBtn from '../LogOutBtn/LogOutBtn'


const Navbar = () => {

  const [open,setOpen] = useState(false)
  const {loggedIn} = useContext(AuthContext)
  const currentLoggedInUser = localStorage.getItem('currentLoggedInUser')

  const closeNavbar = () => {
    setOpen(false)
  }

  return (
    <div className="Navbar">
        <h1 className="logo">Flavour<span>Share</span></h1>
        <nav>
          <ul className="navLinks">
            <li><NavLink to="/">Home</NavLink></li>
            {
              loggedIn===false && (
              <>
                <li><NavLink to="/auth/register">Register</NavLink></li>
                <li><NavLink to="/auth/login">Login</NavLink></li>
              </>
              )
            }
            {
              loggedIn===true && (
                <>
                  <li><NavLink to="/post/feed">Feed</NavLink></li>
                  <li><NavLink to={`/user/${currentLoggedInUser}`}><i className="fa-solid fa-user userIcon fa-sm"></i></NavLink></li>
                  <LogOutBtn/>
                </>
              )
            }
            </ul>
        </nav>
        <i className={open?"fa-sharp fa-solid fa-xmark hamburger":"fa-sharp fa-solid fa-bars hamburger"} onClick={()=>setOpen(!open)}></i>            
        {open && <div className="SideBar">
        <ul className="navLinksSideBar">
            <li><NavLink to="/" onClick={closeNavbar}>Home</NavLink></li>
            {
              loggedIn===false && (
              <>
                <li><NavLink to="/auth/register" onClick={closeNavbar}>Register</NavLink></li>
                <li><NavLink to="/auth/login" onClick={closeNavbar}>Login</NavLink></li>
              </>
              )
            }
            {
              loggedIn===true && (
                <>
                  <li><NavLink to="/post/feed" onClick={closeNavbar}>Feed</NavLink></li>
                  <li><NavLink to={`/user/${currentLoggedInUser}`} onClick={closeNavbar}><i className="fa-solid fa-user userIcon fa-sm"></i></NavLink></li>
                  <LogOutBtn/>
                </>
              )
            }
            </ul>
          </div>}
    </div>
  )
}

export default Navbar
