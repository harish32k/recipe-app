import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MealPostApprove = ({ post, approvePost, deletePost }) => {
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
          {userId && userId._id === "mealDB" ? (
            <Card.Subtitle
              className="mb-2 mt-2 text-muted"
              style={{ fontSize: "small" }}
            >
              By MealDB
            </Card.Subtitle>
          ) : (
            <>
              <br />
              <Card.Subtitle
                as={Link}
                to={`/app/profile/${userId._id}`}
                className="mb-2 text-muted"
                style={{ fontSize: "small", textDecoration: "none" }}
              >
                By {userId.firstName + " " + userId.lastName}
              </Card.Subtitle>
            </>
          )}
          {strCategory && <Card.Text>Category: {strCategory}</Card.Text>}
          {strArea && <Card.Text>Area: {strArea}</Card.Text>}
          <Card.Text style={{ fontSize: "small" }}>
            <strong>Likes:</strong> {likeCount} | <strong>Comments:</strong>{" "}
            {commentCount}
          </Card.Text>
          <Button variant="outline-success" onClick={() => approvePost(_id)}>
            Approve
          </Button>{" "}
          <Button variant="outline-danger" onClick={() => deletePost(_id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MealPostApprove;
