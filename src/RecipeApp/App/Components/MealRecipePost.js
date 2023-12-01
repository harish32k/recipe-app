import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import YouTube from "react-youtube";

function getYouTubeVideoId(url) {
  const regex = /[?&]v=([^?&]+)/;
  const match = url.match(regex);
  return match && match[1];
}

const MealRecipePost = ({
  title,
  image,
  category,
  ingredients,
  instructions,
  videoUrl,
}) => {
  const videoId = getYouTubeVideoId(videoUrl);
  const opts = {
    width: "100%",
    height: "200",
  };

  return (
    <Card style={{ width: "23rem" }}>
      {/* Embed YouTube video */}
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ objectFit: "contain", maxHeight: "250px", width: "auto" }}
      />
      <YouTube videoId={videoId} opts={opts} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {category}
        </Card.Text>
        <Card.Text>
          <strong>Ingredients:</strong> {ingredients.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Instructions:</strong> {instructions}
        </Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
};

MealRecipePost.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructions: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired, // YouTube video URL
};

export default MealRecipePost;
