import * as postClient from "../Clients/recipeClient.js";
import * as likeClient from "../Clients/likeClient.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [likedBy, setLikedBy] = useState([]);
  const [likes, setLikes] = useState({});

  let videoId = "";
  const fetchPostDetails = async () => {
    try {
      const response = await postClient.fetchPostById(postId);
      setPost(response);
      console.log(response);
      videoId = getYouTubeVideoId(post.strYoutube);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await likeClient.fetchLikesOfPost(postId);
      setLikes(response);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const opts = {
    width: "100%",
    height: "300",
    // maxHeight: "250px",
    // width: "auto",
  };

  const mealThumb =
    post.source === "origin"
      ? `data:image/png;base64,${post.strMealThumb}`
      : post.strMealThumb;

  const getYouTubeVideoId = (url) => {
    const regex = /[?&]v=([^?&]+)/;
    console.log("url ", url);
    const match = url.match(regex);
    return match && match[1];
  };

  const renderTooltip = (props) => (
    <Tooltip id="liked-by-tooltip" {...props}>
      {likedBy.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </Tooltip>
  );

  useEffect(() => {
    fetchPostDetails();
    fetchLikes();
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      <pre>{JSON.stringify(likes, null, 2)}</pre>
      {/* <p>Post details for post: {post.strMeal}</p> */}
      <pre>{JSON.stringify(post, null, 2)}</pre>

      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={mealThumb}
          alt={post.strMeal}
          style={{ objectFit: "contain", maxHeight: "400px", width: "auto" }}
        />
        <Card.Body>
          <Card.Title>{post.strMeal}</Card.Title>
          {post.userId && (
            <Link to={`/app/profile/${post.userId._id}`}>
              <Card.Subtitle className="mb-2 text-muted">
                By {post.userId.firstName + " " + post.userId.lastName}
              </Card.Subtitle>
            </Link>
          )}
          <Card.Text>Category: {post.strCategory}</Card.Text>
          <Card.Text>Area: {post.strArea}</Card.Text>
          {post.ingredients &&
            post.measures && ( // Check if ingredients and measures exist
              <Card.Text>
                <strong>Ingredients:</strong>
                <ul>
                  {post.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient} - {post.measures[index]}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            )}
          <Card.Text>
            <strong>Instructions:</strong> {post.strInstructions}
          </Card.Text>
          <YouTube videoId={videoId} opts={opts} />
          <Card.Text>
            <strong>Likes:</strong> {post.likeCount} |{" "}
            <strong>Comments:</strong> {post.commentCount}
          </Card.Text>
          {/* <Card.Text>
          <strong>Likes:</strong>{" "}
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip}
            delay={{ show: 250, hide: 400 }}
          >
            <span>{likes}</span>
          </OverlayTrigger>
        </Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostDetails;
