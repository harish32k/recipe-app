import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

function getYouTubeVideoId(url) {
  const regex = /[?&]v=([^?&]+)/;
  console.log("url ", url);
  const match = url.match(regex);
  return match && match[1];
}

const MealDetails = ({ post }) => {
  const {
    idMeal,
    userId,
    likeCount,
    commentCount,
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    source,
    strYoutube,
    strInstructions,
    ingredients,
    measures,
  } = post;

  const mealThumb =
    source === "origin"
      ? `data:image/png;base64,${strMealThumb}`
      : strMealThumb;

  console.log("strYoutube ", strYoutube);
  const videoId = getYouTubeVideoId(strYoutube);
  const opts = {
    width: "100%",
    height: "200",
    // maxHeight: "250px",
    // width: "auto",
  };

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Img
        variant="top"
        src={mealThumb}
        alt={strMeal}
        style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
      />
      {/* <YouTube videoId={videoId} opts={opts} /> */}
      <Card.Body>
        <Card.Title>{strMeal}</Card.Title>
        <Link to={`/app/profile/${userId}`}>
          <Card.Subtitle className="mb-2 text-muted">By {userId}</Card.Subtitle>
        </Link>
        <Card.Text>Category: {strCategory}</Card.Text>
        <Card.Text>Area: {strArea}</Card.Text>
        <Card.Text>
          <strong>Ingredients:</strong>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient} - {measures[index]}
              </li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Instructions:</strong> {strInstructions}
        </Card.Text>
        <Card.Text>
          <strong>Likes:</strong> {likeCount} | <strong>Comments:</strong>{" "}
          {commentCount}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

MealDetails.propTypes = {
  idMeal: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  strInstructions: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strCategory: PropTypes.string.isRequired,
  strArea: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  strYoutube: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default MealDetails;
