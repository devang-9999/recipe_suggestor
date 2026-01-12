import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../card/Card";
import "./RecipyDashboard.css";

const API_KEY = "6227f2c3ca0445978e061a3a69679bfd";
const LIMIT = 16;

const RecipyDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setRecipes([]);
      setPage(0);
      setHasMore(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const offset = page * LIMIT;

        const res = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: {
              apiKey: API_KEY,
              query: debouncedSearch,
              number: LIMIT,
              offset,
            },
          }
        );

        setRecipes((prev) => [...prev, ...res.data.results]);

        if (res.data.results.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="card-flex">
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}

      {!hasMore && (
        <p style={{ textAlign: "center" }}>
          No more recipes 🍽️
        </p>
      )}
    </div>
  );
};

export default RecipyDashboard;
