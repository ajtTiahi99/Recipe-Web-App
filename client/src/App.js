import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import RecipePage from './Pages/RecipePage/RecipePage';
import Feed from './Pages/Feed/Feed';
import { useContext } from 'react';
import AuthContext from './Context/AuthContextProvider';
import LogOutBtn from './components/LogOutBtn/LogOutBtn';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {

  const {loggedIn} = useContext(AuthContext)

  return (
    <>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          {
            loggedIn===false && <>
                <Route path='/auth/register' element={<Register/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/post/feed' element={<Login/>}/>
                <Route path='/user/:id' element={<Login/>}/>
                <Route path='/post/:id' element={<Login/>} />
            </>
          }
          {
            loggedIn===true && <>
              <Route path='/auth/register' element={<Home/>}/>
              <Route path='/auth/login' element={<Home/>}/>
              <Route path='/post/feed' element={<Feed/>}/>
              <Route path='/user/:id' element={<Profile/>}/>
              <Route path='/post/:id' element={<RecipePage/>} />
              <Route element={<LogOutBtn/>}/>
            </>
          }
          <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
