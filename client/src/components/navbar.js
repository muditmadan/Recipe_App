import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Navbar.css"; // Import your custom CSS for Navbar styling

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar-container">
      <div className="brand">
        Recipe App
      </div>
      <div className="nav-links">
        <RouterLink to="/" className="nav-link">Home</RouterLink>
        <RouterLink to="/create-recipe" className="nav-link">Create Recipe</RouterLink>
        <RouterLink to="/saved-recipes" className="nav-link">Saved Recipes</RouterLink>
      </div>
      <div className="auth">
        {!cookies.access_token ? (
          <RouterLink to="/auth" className="nav-link">Login/Register</RouterLink>
        ) : (
          <button onClick={logout} className="logout-button">Logout</button>
        )}
      </div>
    </div>
  );
};
