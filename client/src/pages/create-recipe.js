import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./CreateRecipe.css"; // Import the CSS file here

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CreateRecipe = () => {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/recipes`,
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
            rows={3}
            className="textarea-field"
          />
          <label htmlFor="ingredients" className="label">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              required
              className="input-field"
            />
          ))}
          <button type="button" onClick={handleAddIngredient} className="add-button">
            Add Ingredient
          </button>
          <label htmlFor="instructions" className="label">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            rows={6}
            className="textarea-field"
          />
          <label htmlFor="imageUrl" className="label">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            required
            className="input-field"
          />
          <label htmlFor="cookingTime" className="label">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

