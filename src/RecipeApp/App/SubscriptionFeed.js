import { useSelector } from "react-redux";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import MealPost from "./MealPost.js";

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
    <div>
      <h1>Subscription Feed</h1>
      {posts.length === 0 && <p>No posts to display</p>}
      {posts.map((post) => (
        <MealPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default SubscriptionFeed;
