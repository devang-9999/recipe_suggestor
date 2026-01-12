import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../card/Card";
import Navbar from "../navbar/Navbar";

const API_KEY = "6227f2c3ca0445978e061a3a69679bfd" ;
const LIMIT = 16;

const Cuisine = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCuisineRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: {
              apiKey: API_KEY,
              cuisine: type,
              number: LIMIT,
            },
          }
        );

        setRecipes(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch cuisine recipes", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCuisineRecipes();
  }, [type]);

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        {type.toUpperCase()} Cuisine
      </h2>

      <div className="card-flex">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : recipes.length > 0 ? (
          recipes.map(recipe => (
            <Card key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Cuisine;
