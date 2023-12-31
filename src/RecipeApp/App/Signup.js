import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as recipeClient from "../Clients/recipeClient.js";
import * as userClient from "../Clients/userClient.js";
import * as favClient from "../Clients/favouritesClient.js";
import "../../App.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "CONSUMER",
    favoriteCategories: [],
  });

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await recipeClient.fetchCategories();
      setCategories(response.map((category) => category.strCategory));
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const selectedCategories = formData.favoriteCategories.includes(value)
        ? formData.favoriteCategories.filter((category) => category !== value)
        : [...formData.favoriteCategories, value];

      setFormData((prevData) => ({
        ...prevData,
        favoriteCategories: selectedCategories,
      }));


      if (selectedCategories.length > 0) {
        setError("");
      }
    } else {
      // Handle other form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const roles = ["CHEF", "CONSUMER", "ADMIN"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.favoriteCategories.length === 0) {
      setError("Please select at least one favorite category");
      return;
    }
    try {
      console.log("signing up here")
      const response = await userClient.signup(formData);
      console.log("obtained response", response, response.status)
      if (response.status === 201) {
        resetForm();
        navigate("/app/signin");
      }
    } catch (err) {
      console.log("error ", err);
      setError("Error signing up");
    } 
    // console.log("Form data submitted:", formData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      role: "CONSUMER",
      favoriteCategories: [],
    });
  };

  return (
    <Container className="my-4" fluid="xl">
      <h1 className="m-4">Signup Page</h1>
      <Row className="justify-content-center align-items-center">
        {error && <div className="alert alert-danger">{error}</div>}
        <Form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #F9A826",
            borderRadius: "10px",
            width: "80%",
          }}
          className="p-4 custom-form"
        >
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <div>
              {roles.map((role) => (
                <Form.Check
                  key={role}
                  type="radio"
                  label={role}
                  id={role}
                  name="role"
                  value={role}
                  checked={formData.role === role}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="favoriteCategories">
            <Form.Label>Favorite Categories</Form.Label>
            <Col>
              <Row>
                {categories.map((category) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={category}>
                    <Form.Check
                      key={category}
                      type="checkbox"
                      label={category}
                      id={category}
                      name="favoriteCategories"
                      value={category}
                      checked={formData.favoriteCategories.includes(category)}
                      onChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Signup;
