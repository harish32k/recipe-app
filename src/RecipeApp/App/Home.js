import { useSelector } from "react-redux";
import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import MealPost from "./MealPost.js";

function Home() {
  const user = useSelector((state) => state.userReducer.user);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await recipeClient.fetchRecipeByName("fish");
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
      <h1>Home</h1>
      <p>Welcome</p>
      <p>Home feed for user: {user.username}</p>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;
