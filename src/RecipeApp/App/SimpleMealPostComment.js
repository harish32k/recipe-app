import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SimpleMealPostComment = ({ post, comment }) => {
  const { _id, strMeal, strMealThumb, source } = post;

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
          <Card.Title as={Link} to={`/app/post/${_id}`}>
            {strMeal}
          </Card.Title>

          <Card.Text>
            <strong>Comment: </strong> {comment}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SimpleMealPostComment;
