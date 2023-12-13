import { useSelector } from "react-redux";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import MealPost from "./MealPost.js";
import { Button } from "react-bootstrap";
import * as authClient from "../Clients/authClient.js";

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

  const handleVerifyAccessTokenFromCookie = async () => {
    try {
      const response = await authClient.verifyAccessTokenFromCookie();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleVerifyAccessTokenFromCookie}>verify</Button>
      {/* <p>Welcome</p>
      <p>Home feed for user: {user.username}</p> */}
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;
