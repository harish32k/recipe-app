import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import * as userClient from "../Clients/userClient.js";
import { useEffect } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab, Button, Card, ListGroup, Nav } from "react-bootstrap";
import UserProfile from "./UserProfile.js";
import { Outlet } from "react-router-dom";

function Profile() {
  let { userId } = useParams();

  console.log("here" + userId)
  const currUser = useSelector((state) => state.userReducer.user);
  let loggedUserChecking = false;
  if (!userId) {
    userId = currUser._id;
    loggedUserChecking = true;
  }
  const [user, setUser] = useState({ "role": "role" });

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

  const navigate = useNavigate();
  const generatePath = (path) => {
    const basePath = !loggedUserChecking ? `${userId}` : '.';
    console.log(`${basePath}/${path}`)
    return (`${basePath}/${path}`);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <h1>Profile</h1>
      <br></br>
      <div>
        <span className="display-6 fw-normal">{user.firstName + " " + user.lastName}</span>
        <span className="display-6 fw-lighter"> {" (@" + user.username + ")"}</span>
        <p className="display-6 fw-lighter">{capitalizeFirstLetter(user.role.toLowerCase())}</p>
      </div>

      {user.role === "CHEF" && userId !== currUser._id && currUser.role !== "GUEST" ?
        <button className="btn btn-outline-primary">Follow</button> : <></>}

      {/* <p>Profile for user: {user.username}</p> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <Nav variant="tabs" defaultActiveKey= "/">
        {user._id === currUser._id ?
          <Nav.Item>
            <Nav.Link as={Link} to={generatePath("")} isActive={pathname === `/` ? true : false}>
              {" "}
              {/* Use relative path for Personal */}
              Information
            </Nav.Link>
          </Nav.Item> : <></>}
        <Nav.Item>
          <Nav.Link as={Link} to={generatePath("likes")} isActive={pathname === `/likes` ? true : false}>
            {" "}
            {/* Use relative path for History */}
            Likes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={generatePath("comments")} isActive={pathname === `/comments` ? true : false}>
            {" "}
            {/* Use relative path for History */}
            Comments
          </Nav.Link>
        </Nav.Item>
        {user.role === "CHEF" ? <Nav.Item>
          <Nav.Link as={Link} to={generatePath("recipes")} isActive={pathname === `/recipes` ? true : false}>
            {" "}
            Recipes
          </Nav.Link>
        </Nav.Item> : <></>}
        <Nav.Item>
          <Nav.Link as={Link} to={generatePath("following")} isActive={pathname === `/following` ? true : false}>
            {" "}
            Following
          </Nav.Link>
        </Nav.Item>
        {user.role === "CHEF" ? <Nav.Item>
          <Nav.Link as={Link} to={generatePath("followers")} isActive={pathname === `/followers` ? true : false}>
            {" "}
            Followers
          </Nav.Link>
        </Nav.Item> : <></>}
        <Nav.Item>
          <Nav.Link as={Link} to={generatePath("user-favourites")} isActive={pathname === `/user` ? true : false}>
            {" "}
            Favourites
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </div>
  );
}

export default Profile;
