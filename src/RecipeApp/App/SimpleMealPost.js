import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SimpleMealPost = ({ post }) => {
  const {
    _id,
    userId,
    likeCount,
    commentCount,
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    source,
  } = post;

  const mealThumb =
    source === "origin"
      ? `data:image/png;base64,${strMealThumb}`
      : strMealThumb;

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={mealThumb}
        alt={strMeal}
        style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
        className="mt-3"
      />
      <Card.Body>
        <Card.Title as={Link} to={`/app/post/${_id}`}>{strMeal}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SimpleMealPost;