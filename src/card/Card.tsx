import { Link } from "react-router-dom"
import "./Card.css"

const Card = ({recipe ,key}) => {
  return (
    <div className="card">
      <img src={recipe.image} />
      <h4>{recipe.name}</h4>
      <p>{recipe.tags}</p>
     
      <Link to={`/recipe/${recipe.id}`}>
        <button className="det-btn">Details</button>
      </Link>
     </div>
  )
}

export default Card
