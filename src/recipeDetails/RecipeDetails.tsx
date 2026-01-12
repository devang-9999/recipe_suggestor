import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./RecipeDetails.css";

const API_KEY = "6227f2c3ca0445978e061a3a69679bfd";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: API_KEY,
            },
          }
        );
        setRecipe(res.data);
      } catch (error) {
        console.error("Failed to fetch recipe details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center" }}>Loading...</p>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center" }}>Recipe not found</p>
      </>
    );
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

            <p>
              <b>Cuisine:</b>{" "}
              {recipe.cuisines.length > 0
                ? recipe.cuisines.join(", ")
                : "N/A"}
            </p>

            <p>
              <b>Ready in:</b> {recipe.readyInMinutes} minutes
            </p>

            <p>
              <b>Servings:</b> {recipe.servings}
            </p>

            <p>
              <b>Ingredients:</b>
            </p>
            <ul>
              {recipe.extendedIngredients.map(ing => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>

            <p>
              <b>Instructions:</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
