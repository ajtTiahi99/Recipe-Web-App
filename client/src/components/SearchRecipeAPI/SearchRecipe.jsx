import React,{useEffect,useState} from 'react'
import './SearchRecipe.css'
import axios from 'axios'

const SearchRecipe = () => {
    const [searchedTerm, setSearchedTerm] = useState('')
    const [defaultQuery] = useState('icecream')
    const [dataReceived,setDataReceived] = useState('')
    const [msg,setMsg] = useState(true)

    const queryStrings = {
        app_id : process.env.EDAMAM_API_ID,
        app_key :process.env.EDAMAM_APP_KEY
    }

    const {app_id,app_key} = queryStrings
    
    useEffect(()=>{
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}&ingr=0-20`)
        .then((response)=>setDataReceived(response)) 
        .catch(err=>console.log(err))
    },[])


    const handleSubmit = async(searchQuery) => {

        const recipeData = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${app_id}&app_key=${app_key}&ingr=0-20`)
        if(recipeData.data.hits.length === 0){
            setMsg(false)
        }
        else{
            setDataReceived(recipeData)
            setSearchedTerm('')
        }

    }

    

    return (
        <>
            <div className="SearchArea">
                <div className="heading-line">
                    <h1>Search Recipes</h1>
                    <div className="input-wrapper">
                        <input 
                            onChange={(e)=>{setSearchedTerm(e.target.value);setMsg(true)}} 
                            value={searchedTerm} 
                            type="text" 
                            placeholder="Search..."
                        />
                        <div className="searchBtn">
                            <i className="fa-solid fa-magnifying-glass" 
                               onClick={()=>handleSubmit(searchedTerm)}>
                            </i>
                        </div>   
                    </div>
                    <span style={{display:msg?"none":"block",color:"red",fontSize:"0.9rem"}}>No Search Results for {searchedTerm.toLowerCase()}</span>
                </div>
                <div className="flexbox">
                    {
                        dataReceived.data && dataReceived.data.hits.map((item,index)=>(
                            <div key={index} className="flexItem">
                                <img src={item.recipe.image} alt={item.recipe.label} />
                                <div className="flex-container">
                                    <p>{item.recipe.label.length < 40?item.recipe.label:item.recipe.label.substring(0,41)+'...'}</p>
                                    <a href={`${item.recipe.url}`} target="_blank" className="btn">View Recipe</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </>
    )
}

export default SearchRecipe