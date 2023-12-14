import React, { useEffect, useState } from "react";
import MealPost from "./MealPost";
import * as recipeClient from "../Clients/recipeClient.js";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

function AreasPosts() {
  const { area } = useParams();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await recipeClient.fetchAreaByName(area);
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
      <h1>{area}</h1>
      <Row className="mt-3">
        {posts.map((post) => (
          <MealPost key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
}

export default AreasPosts;
