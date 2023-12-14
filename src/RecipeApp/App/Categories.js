import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
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
    <Container>
      <h1>Categories</h1>
      {categories.map((category, index) => (
        <div key={index}>
          <h3>
            <span style={{ marginRight: "1rem" }}>{category.strCategory}</span>
            <Button
              as={Link}
              to={`/app/category/${category.strCategory}`}
              variant="outline-primary"
            >
              View Recipes
            </Button>
          </h3>
          <img
            src={category.strCategoryThumb}
            alt={category.strCategory}
            style={{ width: "100%", maxWidth: "300px" }}
          ></img>
          <p>{category.strCategoryDescription}</p>
        </div>
      ))}
    </Container>
  );
}

export default Categories;
