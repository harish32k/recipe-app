import React, { useEffect, useState } from "react";
import MealPost from "./MealPost";
import * as recipeClient from "../Clients/recipeClient.js";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function CategoryPosts() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

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

  return (
    <Container>
      <h1>{category}</h1>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
    </Container>
  );
}

export default CategoryPosts;
