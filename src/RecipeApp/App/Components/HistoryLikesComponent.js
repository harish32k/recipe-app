import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as likeClient from "../../Clients/likeClient.js";
import MealPost from "../MealPost.js";
import SimpleMealPost from "../SimpleMealPost.js";

function HistoryLikesComponent() {
  const BASE_API = process.env.REACT_APP_BASE_API_URL;
  const LIKE_API = `${BASE_API}/api/like`;
  let { userId } = useParams();
  const currUser = useSelector((state) => state.userReducer.user);
  let loggedUserChecking = false;
  if (!userId) {
    userId = currUser._id;
    loggedUserChecking = true;
  }
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const response = await userClient.fetchUserById(userId);
      setUser(response);
      //console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await likeClient.fetchPostsLikedByUser(userId);
      console.log("server: " + response);
      setPosts(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  }

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <div>
      {posts.length === 0 ? <p>There is nothing to see on this page.</p> :
        <ul className="list-group">
          {posts.map((post, index) => (
            <SimpleMealPost key={post._id} post={post.recipe} />
          ))}
        </ul>
      }
    </div>

  );
}

export default HistoryLikesComponent;
