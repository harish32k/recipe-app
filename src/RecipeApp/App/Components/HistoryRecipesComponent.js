import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as recipeClient from "../../Clients/recipeClient.js";
import SimpleMealPostComment from "../SimpleMealPostComment.js";
import MealPost from "../MealPost.js";
import { Container, Row } from "react-bootstrap";
import MealPostEdit from "../MealPostEdit.js";
import { useNavigate } from "react-router-dom";

function HistoryRecipesComponent() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.userReducer.user);
  const [showEdit, setShowEdit] = useState(false);
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

  const deletePost = async (postId) => {
    try {
      await recipeClient.deleteRecipe(postId);
      fetchPosts();
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const editPost = async (postId) => {
    navigate(`/app/createPost/${postId}`);
  };

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
    setShowEdit(currUser._id === userId);
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
  };

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <Container>
      <Row>
        {posts.map((post, index) =>
          showEdit ? (
            <MealPostEdit
              key={post._id}
              post={post}
              editPost={editPost}
              deletePost={deletePost}
            />
          ) : (
            <MealPost post={post} key={post._id} />
          )
        )}
      </Row>
    </Container>
  );
}

export default HistoryRecipesComponent;
