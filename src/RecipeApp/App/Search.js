import { useLocation } from "react-router-dom";
import * as postClient from "../Clients/recipeClient.js";
import { useEffect } from "react";
import { useState } from "react";
import MealPost from "./Components/MealPost.js";

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
    <div>
      <h1>Search</h1>
      <p>Search results for: {recipeName}</p>
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
    </div>
  );
}

export default Search;
