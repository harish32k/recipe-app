import * as postClient from "../Clients/recipeClient.js";
import * as likeClient from "../Clients/likeClient.js";
import * as commentClient from "../Clients/commentClient.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPromptModal from "./LoginPromptModal.js";
import LikesPromptModal from "./LikesPromptModal.js";
import CommentSection from "./CommentSection.js";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLikesPrompt, setShowLikesPrompt] = useState(false);
  const [comments, setComments] = useState([]);

  let videoId = "";

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

  const fetchLikeStatus = async () => {
    try {
      const response = await likeClient.fetchLikeStatus(postId, user._id);
      setLikeStatus(response);
      console.log(response);
    } catch (err) {
      console.log("error ", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentClient.fetchCommentsOfPost(postId);
      setComments(response);
      // console.log(response);
    } catch (err) {
      console.log("error ", err);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="liked-by-tooltip" {...props}>
      {likes.map((like, index) => (
        <div key={index}>{like.userId.username}</div>
      ))}
    </Tooltip>
  );

  const handleLike = async () => {
    console.log("user ", user);
    if (user.role === "GUEST") {
      setShowLoginPrompt(true);
    } else {
      try {
        // console.log("user id ", userId);
        const response = await likeClient.addLike(postId, user._id);
        console.log(response);
        fetchLikes();
        fetchLikeStatus();
      } catch (err) {
        console.log("error ", err);
      }
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await likeClient.removeLike(postId, user._id);
      console.log(response);
      fetchLikes();
      fetchLikeStatus();
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  const handleCloseLikesPrompt = () => {
    setShowLikesPrompt(false);
  };

  const handleShowLikesPrompt = () => {
    setShowLikesPrompt(true);
  };

  const handleAddComment = async (comment) => {
    if (user.role === "GUEST") {
      setShowLoginPrompt(true);
    } else {
      try {
        const response = await commentClient.addComment(
          postId,
          user._id,
          comment
        );
        console.log(response);
        fetchPostDetails();
        fetchComments();
      } catch (err) {
        console.log("error ", err);
      }
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      const response = await commentClient.removeComment(commentId);
      fetchPostDetails();
      fetchComments();
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    fetchPostDetails();
    fetchLikes();
    fetchLikeStatus();
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      <pre>{JSON.stringify(likeStatus, null, 2)}</pre>
      {/* <pre>{JSON.stringify(likes, null, 2)}</pre> */}
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
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip}
              delay={{ show: 250, hide: 400 }}
            >
              <span
                className="text-primary"
                role="button"
                onClick={handleShowLikesPrompt}
              >
                <strong>Likes:</strong> {post.likeCount}
              </span>
            </OverlayTrigger>{" "}
            {likeStatus ? (
              <Button variant="danger" onClick={handleUnlike}>
                Unlike
              </Button>
            ) : (
              <Button variant="success" onClick={handleLike}>
                Like
              </Button>
            )}
          </Card.Text>
          <Card.Text>
            <strong>Comments:</strong> {post.commentCount}
          </Card.Text>
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleRemoveComment}
          />
        </Card.Body>
      </Card>

      <LoginPromptModal
        show={showLoginPrompt}
        handleClose={handleCloseLoginPrompt}
      />

      <LikesPromptModal
        show={showLikesPrompt}
        handleClose={handleCloseLikesPrompt}
        likes={likes}
      />
    </div>
  );
}

export default PostDetails;
