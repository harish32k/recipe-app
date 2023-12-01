import React from "react";
import MealRecipePostFromJson from "./MealRecipePostFromJson"; // Import your MealRecipePostFromJson component

const MealListFromJson = ({ mealData }) => {
  return (
    <div>
      {mealData && mealData.meals ? (
        mealData.meals.map((meal, index) => (
          <div key={index}>
            <MealRecipePostFromJson meal={meal} />
          </div>
        ))
      ) : (
        <p>No meals available</p>
      )}
    </div>
  );
};

export default MealListFromJson;
