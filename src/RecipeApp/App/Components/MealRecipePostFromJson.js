import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

function getYouTubeVideoId(url) {
  const regex = /[?&]v=([^?&]+)/;
  const match = url.match(regex);
  return match && match[1];
}

const MealRecipePostFromJson = ({ meal }) => {
  const videoId = getYouTubeVideoId(meal.strYoutube);
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
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
      />
      <YouTube videoId={videoId} opts={opts} />
      <Card.Body>
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {meal.strCategory}
        </Card.Text>
        <Card.Text>
          <strong>Ingredients:</strong>
          <ul>
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key, index) => (
                <li key={index}>
                  {meal[key]} - {meal[`strMeasure${key.slice(-1)}`]}
                </li>
              ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Instructions:</strong> {meal.strInstructions}
        </Card.Text>
        <Link to={`/details/${meal.idMeal}`}>
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MealRecipePostFromJson.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
};

export default MealRecipePostFromJson;
