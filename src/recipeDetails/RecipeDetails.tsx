import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import "./RecipeDetails.css"

const RecipeDetails = () => {
  const { id } = useParams()  
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
  }, [id])

  if (!recipe) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center" }}>Loading...</p>
      </>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="detail-page">
        <div className="detail-card">
          <img
            src={recipe.image}
            className="detail-image"
            alt={recipe.title}
          />

          <div className="detail-info">
            <h2>{recipe.title}</h2>
            <p><b>Ingredients:</b> {recipe.ingredients}</p>
            <p><b>Instructions:</b> {recipe.instructions}</p>
            <p className="price">{recipe.cuisine}</p>
            <p>{recipe.difficulty}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default RecipeDetails
