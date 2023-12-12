import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const data = await recipeClient.fetchCategories();
      setCategories(data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
      {categories.map((category, index) => (
        <div key={index}>
          <h3>
            {category.strCategory + " "}
            <Button as={Link} to={`/app/category/${category.strCategory}`}>
              View Recipes
            </Button>
          </h3>
          <img src={category.strCategoryThumb} alt={category.strCategory} />
          <p>{category.strCategoryDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default Categories;
