import * as postClient from "../Clients/postClient.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
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

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      {/* <p>Post details for post: {post.strMeal}</p> */}
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={mealThumb}
          alt={post.strMeal}
          style={{ objectFit: "contain", maxHeight: "400px", width: "auto" }}
        />
        <Card.Body>
          <Card.Title>{post.strMeal}</Card.Title>
          <Link to={`/app/profile/${post.userId}`}>
            <Card.Subtitle className="mb-2 text-muted">
              By {post.userId}
            </Card.Subtitle>
          </Link>
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
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostDetails;
