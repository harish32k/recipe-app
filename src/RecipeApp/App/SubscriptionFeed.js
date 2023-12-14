import { useSelector } from "react-redux";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import MealPost from "./MealPost.js";
import { Container, Row } from "react-bootstrap";

function SubscriptionFeed() {
  const user = useSelector((state) => state.userReducer.user);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await recipeClient.fetchSubscribedRecipe(user._id);
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
      <h1 className="mb-2">Subscription Feed</h1>
      {posts.length === 0 && <p>No posts to display</p>}
      <Row className="pt-2 min-vh-100 border border-2 border-warning rounded">
        {posts.map((post) => (
          <MealPost key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
}

export default SubscriptionFeed;
