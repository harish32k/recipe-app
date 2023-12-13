import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { Tabs, Tab, Button, Card, ListGroup, Nav } from "react-bootstrap";
import * as userClient from "../../Clients/userClient.js";
import HistoryLikesComponent from "./HistoryLikesComponent.js";
import HistoryCommentsComponent from "./HistoryCommentsComponent.js";
function HistoryComponent() {

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
  const generatePath = (path) => {
    const basePath = !loggedUserChecking ? `${userId}` : '.';
    console.log(`${basePath}/${path}`)
    return (`${basePath}/${path}`);
  };

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, []);

  return (
    <div>
      <h2>{user.firstName}</h2>
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link as={Link} to="likes">
            {" "}
            {/* Use relative path for History */}
            Likes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="comments">
            {" "}
            Comments
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="recipes">
            {" "}
            Recipes
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Routes>
        <Route path="likes" element={<HistoryLikesComponent />} />
        <Route path="comments" element={<HistoryCommentsComponent />} />
        <Route path="likes" element={<HistoryLikesComponent />} />
      </Routes>


    </div>
  );
}

export default HistoryComponent;
