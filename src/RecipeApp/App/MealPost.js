import React from "react";
import { Card, Button, Col } from "react-bootstrap";
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
    <Col xs={12} md={6} lg={4} xl={3} className="mb-4">
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          src={mealThumb}
          alt={strMeal}
          style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
          className="mt-3"
        />
        <Card.Body>
          <Link to={`/app/post/${_id}`}>
            <Card.Title>{strMeal}</Card.Title>
          </Link>
          {userId && userId._id === "mealDB" ? (
            <Card.Subtitle className="mb-2 text-muted">By MealDB</Card.Subtitle>
          ) : (
            <Link to={`/app/profile/${userId._id}`}>
              <Card.Subtitle className="mb-2 text-muted">
                By {userId.firstName + " " + userId.lastName}
              </Card.Subtitle>
            </Link>
          )}

          {strCategory && <Card.Text>Category: {strCategory}</Card.Text>}
          {strArea && <Card.Text>Area: {strArea}</Card.Text>}

          <Card.Text>
            <strong>Likes:</strong> {likeCount} | <strong>Comments:</strong>{" "}
            {commentCount}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MealPost;
