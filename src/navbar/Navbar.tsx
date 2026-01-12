import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

export default function Navbar ({ searchQuery, setSearchQuery }) {

        const navigate=useNavigate();

    const handleCuisineChange =(e)=>{
        const value = e.target.value;
        navigate(`/cuisine/${value}`)
    };

    return (
        <div className="navbar">
            <h2>Recipy Suggestor</h2>

            {setSearchQuery && (
                <input
                    className="input-search"
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            )}

            <div className="nav-links">
                <Link to="/recipe-dashboard">Home</Link>

                
                <label for="Cuisine">Category:</label>
                      <select name="Cuisine" id="cuisine" onChange={handleCuisineChange}>
                    <option value="Mexican">Mexican</option>
                    <option value="Italian">Itailan</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Asian">Asian</option>
                </select>
               

                <Link to="/login">
                    Login
                </Link>
            </div>
        </div>
    )
}


