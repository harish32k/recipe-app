import { useLocation } from "react-router-dom";
import * as postClient from "../Clients/recipeClient.js";
import { useEffect } from "react";
import { useState } from "react";
import MealPost from "./MealPost.js";
import { Container, Row } from "react-bootstrap";

function Search() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const recipeName = params.get("recipeName");

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await postClient.fetchRecipeByName(recipeName);
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [recipeName]);

  return (
    <Container>
      <h1>Search</h1>
      <p>Search results for: {recipeName}</p>
      <Row>
        {posts.map((post) => (
          <MealPost key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
}

export default Search;
