import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MealPost from "./MealPost";
import { Container, Row } from "react-bootstrap";
import MealPostApprove from "./MealPostApprove.js";

function ApprovePost() {
  const user = useSelector((state) => state.userReducer.user);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await recipeClient.fetchUnapprovedPosts();
      setPosts(response);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const approvePost = async (postId) => {
    try {
      await recipeClient.approveRecipe(postId);
      fetchPosts();
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <h1>Approve Posts</h1>
      <Row>
        {posts.map((post) => (
          // <div key={index}>
          //   <button
          //     onClick={() => approvePost(post._id)}
          //     className="btn btn-success"
          //   >
          //     Approve
          //   </button>
          //   <button
          //     onClick={() => deletePost(post._id)}
          //     className="btn btn-danger"
          //   >
          //     Delete
          //   </button>
          //   <MealPost post={post} />
          // </div>
          <MealPostApprove
            key={post._id}
            post={post}
            approvePost={approvePost}
            deletePost={deletePost}
          />
        ))}
      </Row>
    </Container>
  );
}

export default ApprovePost;
