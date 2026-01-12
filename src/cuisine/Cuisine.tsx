import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../card/Card'
import Navbar from '../navbar/Navbar'


const Cuisine = () => {
  const { type } = useParams()
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/tag/${type}`)
      .then(res => res.json())
      .then(data => setRecipes(data.recipes || []))
      .catch(() => setRecipes([]))
  }, [type])

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        {type.toUpperCase()} Cuisine
      </h2>

      <div className="card-flex">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <Card key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No recipes found</p>
        )}
      </div>
    </div>
  )
}

export default Cuisine
