import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as recipeClient from "../../Clients/recipeClient.js";
import SimpleMealPostComment from "../SimpleMealPostComment.js";
import MealPost from "../MealPost.js";

function HistoryRecipesComponent() {

  let { userId } = useParams();
  const currUser = useSelector((state) => state.userReducer.user);
  let loggedUserChecking = false;
  if (!userId) {
    userId = currUser._id;
    loggedUserChecking = true;
  }
  const [user, setUser] = useState({});

  const fetchUserDetails = async () => {
    try {
      const response = await userClient.fetchUserById(userId);
      setUser(response);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, [userId]);


  
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await recipeClient.fetchUserRecipes(userId);
      setPosts(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  }

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchPosts();
    }
  }, [userId]);


  return (
    <div>
      {posts.map((post, index) => (
        <MealPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default HistoryRecipesComponent;
