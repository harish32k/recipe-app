import React from "react";
import MealRecipePost from "./MealRecipePost"; // Import your MealRecipePost component

const MealList = ({ mealData }) => {
  return (
    <div>
      {Object.values(mealData).map((mealGroup, index) => (
        <div key={index}>
          {mealGroup.meals.map((meal) => (
            <MealRecipePost
              key={meal.idMeal}
              title={meal.strMeal}
              image={meal.strMealThumb}
              category={meal.strCategory}
              ingredients={[
                meal.strIngredient1,
                meal.strIngredient2,
                meal.strIngredient3,
                // Add more ingredients as needed
              ]}
              instructions={meal.strInstructions}
              videoUrl={meal.strYoutube}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MealList;
