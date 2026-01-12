import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/registerSlice";
import "./Navbar.css";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state) => state.users.loggedInUser
  );

  const handleCuisineChange = (e) => {
    const value = e.target.value;
    navigate(`/cuisine/${value}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Recipy Suggestor</h2>

      {setSearchQuery && (
        <input
          className="input-search"
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}

      <div className="nav-links">
        <Link to="/recipe-dashboard">Home</Link>

        <label htmlFor="cuisine">Category:</label>
        <select id="cuisine" onChange={handleCuisineChange}>
          <option value="">Select</option>
          <option value="Mexican">Mexican</option>
          <option value="Italian">Italian</option>
          <option value="Asian">Asian</option>
        </select>

        {!loggedInUser ? (
          <Link to="/login">Login</Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
