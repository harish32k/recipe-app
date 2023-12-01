import React from "react";
import MealRecipePost from "./MealRecipePost";

const sampleMealPost = {
  title: "Delicious Pasta",
  image: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
  category: "Italian",
  ingredients: ["Pasta", "Tomatoes", "Olive Oil", "Garlic", "Basil"],
  instructions:
    "Boil the pasta, sauté garlic in olive oil, add tomatoes and basil, mix with pasta.",
  videoUrl: "https://www.youtube.com/watch?v=C5J39YnnPsg",
};

const SampleMealPost = () => {
  return (
    <div className="container mt-4">
      <h1>Random Meal Recipe Post</h1>
      <MealRecipePost {...sampleMealPost} />
    </div>
  );
};

export default SampleMealPost;
