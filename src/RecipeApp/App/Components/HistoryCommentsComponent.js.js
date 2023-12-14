import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as commentClient from "../../Clients/commentClient.js";
import SimpleMealPost from "../SimpleMealPost.js";
import SimpleMealPostComment from "../SimpleMealPostComment.js";
import { Container, Row } from "react-bootstrap";

function HistoryCommentsComponent() {
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
      const response = await commentClient.fetchCommentsByUser(userId);
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
      {/* {posts.map((post, index) => (
        <SimpleMealPostComment key={post._id} post={post.recipe} comment={post.strComment} />
      ))} */}
      {posts.length === 0 ? (
        <p>There is nothing to see on this page.</p>
      ) : (
        <ul className="list-group">
          <Row>
            {posts.map((post, index) => (
              <SimpleMealPostComment
                key={post._id}
                post={post.recipe}
                comment={post.strComment}
              />
            ))}
          </Row>
        </ul>
      )}
    </Container>
  );
}

export default HistoryCommentsComponent;
