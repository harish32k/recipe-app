import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const data = await recipeClient.fetchCategories();
      setCategories(data);
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
      {categories &&
        categories.map((category, index) => (
          <div key={index} className="text-justify mt-4">
            <h3>
              <span style={{ marginRight: "1rem" }}>
                {category.strCategory}
              </span>
              <Button
                as={Link}
                to={`/app/category/${category.strCategory}`}
                variant="outline-success"
                className="float-end"
              >
                View Recipes
              </Button>
            </h3>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              style={{ width: "100%", maxWidth: "300px" }}
              className="mt-3"
              ></img>
            <p style={{ textAlign: 'justify' }} className="mt-4">{category.strCategoryDescription}</p>
          </div>
        ))}
    </Container>
  );
}

export default Categories;
