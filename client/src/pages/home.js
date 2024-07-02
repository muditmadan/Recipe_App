// Home.js

import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";

import "./Home.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes`);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/recipes`, {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={recipe._id} className="recipe">
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="recipe-details">
              <h2 className="recipe-title">{recipe.name}</h2>
              <div className="recipe-instructions">
                <p>{recipe.instructions}</p>
              </div>
              <p className="recipe-cooking-time">
                Cooking Time: {recipe.cookingTime} minutes
              </p>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className="save-button"
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
