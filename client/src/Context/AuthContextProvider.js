import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

//Check if the user is loggedIn or Not
const AuthContextProvider = (props) => {
    
    const [loggedIn, setLoggedIn] = useState(undefined)

    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn")
        setLoggedIn(loggedInRes.data)
    }

    //This function will run the first time we log into our account
    useEffect(()=>{
        getLoggedIn()
    },[])
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export {AuthContextProvider}
