import { useSelector } from "react-redux";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import MealPost from "./MealPost.js";
import { Container, Row } from "react-bootstrap";

function Home() {
  const user = useSelector((state) => state.userReducer.user);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      if (user.role === "GUEST") {
        const data = await recipeClient.fetchCompleteRandomRecipe();
        setPosts(data);
      } else {
        const data = await recipeClient.fetchRecipeByFavoriteCategoryOfUser(
          user._id
        );
        setPosts(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  return (
    <Container>
      <h1>Home</h1>
      {posts.length === 0 && <p>No posts to display</p>}
      <Row>
        {posts.map((post, index) => (
          <MealPost key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
}

export default Home;
