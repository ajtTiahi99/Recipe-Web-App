import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Carousal from '../../components/Carousal/Carousal'
import SearchRecipe from '../../components/SearchRecipeAPI/SearchRecipe'

const Home = () => {

  const UseNavigate = useNavigate()
  const goToRegister = () => {
    UseNavigate('/post/feed')
  }

  return (
    <>
      <div className="bgImg">
        <div className="content">
          <h1>Good Food Choices Are Good Investments</h1>
          <p>An easy way to eat healthy at home
              Bring fresh ingredients to the table with tasty, homemade recipes that target your health goals. 
          </p>
        </div> 
      </div> 
      <section className="section2">
        <h1>Thousands of International Cuisines, Save Your Favourite ones</h1>
        <Carousal/> 
      </section>
      <section className="section3">
        <SearchRecipe/>
      </section>   
      <section className="section4">
        <div className="leftSection">
          <h1>Share Your recipes to the world</h1>
          <button className="btn" onClick={goToRegister}>Join Our Network</button>
        </div>
        <div className="rightSection">
          <div className="overlay-text">
            <h1>Food is Passion<br/>Food is Love</h1>
            <p>Make everyday cooking fun, because cooking is the key to a happier and healthier life for people, communities and the planet. We provide you a place where you can connect and share your secret Recipies with the world!</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
