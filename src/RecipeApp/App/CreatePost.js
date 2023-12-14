import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [message, setMessage] = useState("");

  const fetchPost = async () => {
    try {
      const response = await recipeClient.fetchPostById(id);
      console.log(response);
      setFormData({
        strMeal: response.strMeal,
        strCategory: response.strCategory,
        strArea: response.strArea,
        strInstructions: response.strInstructions,
        strMealThumb: response.strMealThumb,
        strYoutube: response.strYoutube,
        ingredients: response.ingredients,
        measures: response.measures,
        newIngredient: "",
        newMeasure: "",
      });
      if (response.userId._id !== user._id) {
        alert("You are not authorized to edit this post");
        navigate("/app");
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await recipeClient.fetchCategories();
      setCatergories(response.map((category) => category.strCategory));
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await recipeClient.fetchAreas();
      setAreas(response.map((area) => area.strArea));
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
    setMessage("");
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
    setMessage("");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddIngredientAndMeasure = () => {
    setMessage("");
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

    try {
      const body = {
        strMeal,
        strCategory,
        strArea,
        strInstructions,
        strMealThumb,
        strYoutube,
        ingredients,
        measures,
        userId: user._id,
      };
      if (id) {
        const response = await recipeClient.updatePost(body, id);
        console.log(response);
        setMessage("Post updated successfully");
      } else {
        const response = await recipeClient.createPost(body);
        console.log(response);
        setMessage("Post created successfully");
      }
      resetForm();
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAreas();
    if (id) {
      fetchPost();
    }
  }, []);

  return (
    <Container className="my-4" fluid="xl">
      {/* <pre>{JSON.stringify(catergories, null, 2)}</pre>
      <pre>{JSON.stringify(areas, null, 2)}</pre> */}
      <h1 className="m-4">Create Post</h1>
      <Row className="justify-content-center align-items-center">
        {message && <div className="alert alert-success">{message}</div>}
        <Form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #F9A826",
            borderRadius: "10px",
            width: "80%",
          }}
          className="p-4 custom-form"
        >
          <Form.Group controlId="formStrMeal">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="strMeal"
              value={formData.strMeal}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formStrCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="strCategory"
              value={formData.strCategory}
              onChange={handleInputChange}
              required
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
              required
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
              required
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
                variant="warning"
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
                    variant="outline-danger"
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

          <Button variant="success" type="submit" className="mt-3">
            Create Post
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CreatePost;
