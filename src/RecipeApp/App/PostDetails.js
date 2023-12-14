import * as postClient from "../Clients/recipeClient.js";
import * as likeClient from "../Clients/likeClient.js";
import * as commentClient from "../Clients/commentClient.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
} from "react-bootstrap";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPromptModal from "./LoginPromptModal.js";
import LikesPromptModal from "./LikesPromptModal.js";
import CommentSection from "./CommentSection.js";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({ strYoutube: "" });
  const [likes, setLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLikesPrompt, setShowLikesPrompt] = useState(false);
  const [comments, setComments] = useState([]);

  let videoId = "";

  const opts = {
    width: "100%",
    height: "500px",
    maxHeight: "100%",
    maxWidth: "100%",
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
      // console.log(response);
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
      console.log("LIKES: ", response);
      await fetchLikeStatus(postId, user);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchLikeStatus = async () => {
    const like = await likeClient.fetchLikeStatus(postId, user._id); //likes.find((like) => like.userId._id === user._id);
    //console.log("STATUS", like)
    if (like.liked) {
      await setLikeStatus(true);
    } else {
      await setLikeStatus(false);
    }
    console.log("like status ", likeStatus);
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
        await fetchLikes();
      } catch (err) {
        console.log("error ", err);
      }
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await likeClient.removeLike(postId, user._id);
      console.log(response);
      await fetchLikes();
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
    } else if (comment.trim() !== "") {
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
      console.log("comment id ", commentId);
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
    fetchComments();
    console.log("like status ", likeStatus);
  }, [likeStatus, user]);

  return (
    <Container>
      <h1 className="mb-4">Post Details</h1>
      {/* <pre>{JSON.stringify(likes, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(likes, null, 2)}</pre> */}
      {/* <p>Post details for post: {post.strMeal}</p> */}
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}

      <Row className="justify-content-center align-items-center">
        <Card
          style={{ width: "100%" }}
        // style={{ width: "85%" }}
        // className="border border-1 border-warning rounded p-5 pt-4"
        >
          <Card.Img
            variant="top"
            src={mealThumb}
            alt={post.strMeal}
            style={{ objectFit: "contain", maxHeight: "400px", width: "auto" }}
          />
          <Card.Body>
            <Card.Title
              as={Link}
              to={`/app/post/${post._id}`}
              style={{
                color: "#FF8C00",
                fontSize: "large",
              }}
            >
              {post.strMeal}
            </Card.Title>

            {post.userId &&
              (post.userId._id === "mealDB" ? (
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
                    to={`/app/profile/${post.userId._id}`}
                    className="mb-2 text-muted"
                    style={{ fontSize: "small", textDecoration: "none" }}
                  >
                    By {post.userId.firstName + " " + post.userId.lastName}
                  </Card.Subtitle>
                </>
              ))}

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
            <Card.Text className="text-justify">
              <strong>Instructions: </strong>
              <div style={{ textAlign: 'justify' }}>{post.strInstructions}</div>
            </Card.Text>
            <YouTube videoId={getYouTubeVideoId(post.strYoutube)} opts={opts} style={{ maxWidth: '70%', margin: '0 auto' }} className="mb-4" />
            <Card.Text>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip}
                delay={{ show: 250, hide: 400 }}
              >
                <span
                  className="text-primary me-2"
                  role="button"
                  onClick={handleShowLikesPrompt}
                >
                  <strong style={{
                    color: "#FF8C00"
                  }}>Likes: {post.likeCount}</strong> 
                </span>
              </OverlayTrigger>{" "}
              {likeStatus ? (
                <Button variant="success" onClick={handleUnlike} size="sm">
                  Unlike
                </Button>
              ) : (
                <Button variant="outline-success" onClick={handleLike} size="sm">
                  Like
                </Button>
              )}
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
      </Row>
    </Container>
  );
}

export default PostDetails;
