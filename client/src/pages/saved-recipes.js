import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";
import "./RecipesPage.css"; // Import the CSS file with styles for recipes

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="recipes-container">
      
      <div className="recipes">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe">
            <div>
              <h2 className="recipe-title">{recipe.name}</h2>
            </div>
            <p className="recipe-description">{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p className="recipe-cooking-time">Cooking Time: {recipe.cookingTime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};
