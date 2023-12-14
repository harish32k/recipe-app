import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

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
    <Col xs={12} sm={6} md={4} lg={4} xl={3} className="mb-4">
      <Card style={{ width: "18rem", maxWidth: "95%" }}>
        <Card.Img
          variant="top"
          src={mealThumb}
          alt={strMeal}
          style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
          className="mt-3"
        />
        <Card.Body>
          <Card.Title
            as={Link}
            to={`/app/post/${_id}`}
            style={{
              color: "#FF8C00",
              textDecoration: "none",
            }}
          >
            {strMeal}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SimpleMealPost;
