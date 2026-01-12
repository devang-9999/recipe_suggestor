import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ recipe }) => {
  return (
    <div className="card">
      <img
        src={recipe.image}
        alt={recipe.title}
      />

      <h4>{recipe.title}</h4>

      <Link to={`/recipe/${recipe.id}`}>
        <button className="det-btn">Details</button>
      </Link>
    </div>
  );
};

export default Card;
