import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MealPost = ({ post }) => {
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
      />
      <Card.Body>
        <Card.Title>{strMeal}</Card.Title>
        <Link to={`/app/profile/${userId._id}`}>
          <Card.Subtitle className="mb-2 text-muted">
            By {userId.firstName + " " + userId.lastName}
          </Card.Subtitle>
        </Link>
        <Card.Text>Category: {strCategory}</Card.Text>
        <Card.Text>Area: {strArea}</Card.Text>
        <Card.Text>
          <strong>Likes:</strong> {likeCount} | <strong>Comments:</strong>{" "}
          {commentCount}
        </Card.Text>
        <Button as={Link} to={`/app/post/${_id}`} variant="primary">
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MealPost;
