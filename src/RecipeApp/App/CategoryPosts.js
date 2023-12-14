import React, { useEffect, useState } from "react";
import MealPost from "./MealPost";
import * as recipeClient from "../Clients/recipeClient.js";
import * as favClient from "../Clients/favouritesClient.js";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoginPromptModal from "./LoginPromptModal.js";

function CategoryPosts() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.userReducer.user);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const getPosts = async () => {
    try {
      const data = await recipeClient.fetchCategoryByName(category);
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const currUser = useSelector((state) => state.userReducer.user);

  const [favouritedStatus, setFavouritedStatus] = useState(false);
  const fetchFavouriteStatus = async () => {
    try {
      const response = await favClient.fetchFavouritedStatus(
        currUser._id,
        category
      );
      console.log("STATUS", response.favourited);
      setFavouritedStatus(response.favourited);
    } catch (err) {
      console.log("error ", err);
    }
  };
  useEffect(() => {
    fetchFavouriteStatus();
  }, [category]);

  const handleFavourite = async () => {
    if (user.role === "GUEST") {
      setShowLoginPrompt(true);
      return;
    }
    try {
      const response = await favClient.addFavouriteCategory(
        currUser._id,
        category
      );
      await fetchFavouriteStatus();
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleUnfavourite = async () => {
    try {
      const response = await favClient.removeFavouriteCategory(
        currUser._id,
        category
      );
      await fetchFavouriteStatus();
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <Container>
      <h1>{category} {favouritedStatus ? (
        <button className="btn btn-success" onClick={() => handleUnfavourite()}>
          Favourited
        </button>
      ) : (
        <button
          className="btn btn-outline-success"
          onClick={() => handleFavourite()}
        >
          Favourite
        </button>
      )}</h1>
      
      <Row className="mt-3">
        {posts.map((post) => (
          <MealPost key={post._id} post={post} />
        ))}
      </Row>
      <LoginPromptModal
        show={showLoginPrompt}
        handleClose={handleCloseLoginPrompt}
      />
    </Container>
  );
}

export default CategoryPosts;
