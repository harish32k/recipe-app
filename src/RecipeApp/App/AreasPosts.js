import React, { useEffect, useState } from "react";
import MealPost from "./MealPost";
import * as recipeClient from "../Clients/recipeClient.js";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>{area}</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default AreasPosts;
