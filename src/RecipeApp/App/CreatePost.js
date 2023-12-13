import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [formData, setFormData] = useState({
    strMeal: "",
    strCategory: "",
    strArea: "",
    strInstructions: "",
    strMealThumb: "",
    strYoutube: "",
    ingredients: [],
    measures: [],
    newIngredient: "",
    newMeasure: "",
  });

  const [catergories, setCatergories] = useState([]);
  const [areas, setAreas] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await recipeClient.fetchCategories();
      setCatergories(
        response.categories.map((category) => category.strCategory)
      );
      console.log(response.categories.map((category) => category.strCategory));
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await recipeClient.fetchAreas();
      setAreas(response.meals.map((area) => area.strArea));
      console.log(response.meals.map((area) => area.strArea));
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const [base64String, setBase64String] = useState("");

  const resetForm = () => {
    setFormData({
      strMeal: "",
      strCategory: "",
      strArea: "",
      strInstructions: "",
      strMealThumb: "",
      strYoutube: "",
      ingredients: [],
      measures: [],
      newIngredient: "",
      newMeasure: "",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result;
        setBase64String(base64);
        setFormData((prevData) => ({
          ...prevData,
          strMealThumb: base64.substring(base64.indexOf(",") + 1),
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddIngredientAndMeasure = () => {
    if (formData.newIngredient && formData.newMeasure) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, prevData.newIngredient],
        measures: [...prevData.measures, prevData.newMeasure],
        newIngredient: "",
        newMeasure: "",
      }));
    }
  };

  const handleRemoveIngredientAndMeasure = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((_, i) => i !== index),
      measures: prevData.measures.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your logic to submit the form data to the server
    console.log(formData);
    const {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strYoutube,
      ingredients,
      measures,
    } = formData;
    if (user.role === "CHEF") {
      if (
        !(
          formData.strMeal &&
          formData.strCategory &&
          formData.strArea &&
          formData.strInstructions &&
          formData.ingredients.length > 0 &&
          formData.measures.length > 0
        )
      ) {
        alert("Please fill in all the fields");
      } else {
        try {
          const response = await recipeClient.createPost({
            strMeal,
            strCategory,
            strArea,
            strInstructions,
            strMealThumb,
            strYoutube,
            ingredients,
            measures,
            userId: user._id,
          });
          console.log(response);
          resetForm();
        } catch (err) {
          console.log("error ", err);
        }
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAreas();
  }, []);

  return (
    <Container className="my-4" fluid="xl">
      {/* <pre>{JSON.stringify(catergories, null, 2)}</pre>
      <pre>{JSON.stringify(areas, null, 2)}</pre> */}
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStrMeal">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="strMeal"
            value={formData.strMeal}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStrCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="strCategory"
            value={formData.strCategory}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {catergories.length > 0 &&
              catergories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formStrArea">
          <Form.Label>Area</Form.Label>
          <Form.Control
            as="select"
            name="strArea"
            value={formData.strArea}
            onChange={handleInputChange}
          >
            <option value="">Select an area</option>
            {areas.length > 0 &&
              areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formStrInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter instructions"
            name="strInstructions"
            value={formData.strInstructions}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an image file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          {base64String && (
            <img
              src={base64String}
              alt="Selected"
              className="mt-3"
              style={{
                objectFit: "contain",
                maxHeight: "300px",
                width: "auto",
              }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="formStrYoutube">
          <Form.Label>YouTube URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter YouTube URL"
            name="strYoutube"
            value={formData.strYoutube}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Ingredients and Measures */}
        <Form.Group controlId="formIngredients">
          <Form.Label>Ingredients and Measures</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Ingredient"
              name="newIngredient"
              value={formData.newIngredient}
              onChange={handleInputChange}
            />
            <Form.Control
              type="text"
              placeholder="Measure"
              name="newMeasure"
              value={formData.newMeasure}
              onChange={handleInputChange}
            />
            <Button
              variant="primary"
              onClick={handleAddIngredientAndMeasure}
              className="ms-2"
            >
              Add
            </Button>
          </div>
          <div className="list-group">
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-2 list-group-item"
              >
                <span>
                  <strong>Ingredient: </strong>
                  {ingredient}
                </span>
                <span className="ms-2">
                  <strong>Measure: </strong>
                  {formData.measures[index]}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveIngredientAndMeasure(index)}
                  className="ms-2"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;