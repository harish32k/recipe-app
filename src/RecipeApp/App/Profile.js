import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as userClient from "../Clients/userClient.js";
import * as followClient from "../Clients/followClient.js";
import { useEffect } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Tabs,
  Tab,
  Button,
  Card,
  ListGroup,
  Nav,
  Container,
} from "react-bootstrap";
import UserProfile from "./UserProfile.js";
import { Outlet } from "react-router-dom";
import "../../App.js";

function Profile() {
  let { userId } = useParams();

  console.log("here" + userId);
  const currUser = useSelector((state) => state.userReducer.user);
  let loggedUserChecking = false;
  if (!userId) {
    userId = currUser._id;
    loggedUserChecking = true;
  }
  const [user, setUser] = useState({ role: "role" });

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
    if (userId === "GUEST") {
      navigate("/app/");
    }
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, [userId]);

  const navigate = useNavigate();
  const generatePath = (path) => {
    const basePath = !loggedUserChecking ? `${userId}` : ".";
    console.log(`${basePath}/${path}`);
    return `${basePath}/${path}`;
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchFollowerCount = async () => {
    try {
      const response = await followClient.getFollowerCount(user._id);
      setFollowCount(response.count);
      console.log("count", response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const fetchFollowStatus = async () => {
    try {
      const response = await followClient.followingStatus(
        currUser._id,
        user._id
      );
      console.log("STATUS", response.following);
      setFollowStatus(response.following);

      console.log("count", response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  const location = useLocation();
  const { pathname } = location;

  const [followCount, setFollowCount] = useState(0);
  const [followStatus, setFollowStatus] = useState(false);
  useEffect(() => {
    // if (!(currUser.role === "GUEST" && userId === currUser._id)) {
    //   fetchUserDetails();
    // }
    fetchFollowerCount();
    fetchFollowStatus();
  }, [user]);

  const handleFollow = async () => {
    try {
      const response = await followClient.addFollow(currUser._id, user._id);
      await fetchFollowerCount();
      await fetchFollowStatus();
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await followClient.removeFollow(currUser._id, user._id);
      await fetchFollowerCount();
      await fetchFollowStatus();
    } catch (err) {
      console.log("error ", err);
    }
  };

  return (
    <Container>
      <h1>Profile</h1>
      <br></br>
      <div>
        <span className="display-6 fw-normal">
          {user.firstName + " " + user.lastName}
        </span>
        <span className="display-6 fw-lighter">
          {" "}
          {" (@" + user.username + ")"}
        </span>
        <p className="display-6 fw-lighter">
          {capitalizeFirstLetter(user.role.toLowerCase())}
        </p>
      </div>

      {user.role === "CHEF" &&
      userId !== currUser._id &&
      currUser.role !== "GUEST" ? (
        !followStatus ? (
          <button
            className="btn btn-outline-primary"
            onClick={() => handleFollow()}
          >
            Follow
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => handleUnfollow()}>
            Unfollow
          </button>
        )
      ) : (
        <></>
      )}
      {user.role === "CHEF" ? <span> Followers: {followCount}</span> : <></>}

      {/* <p>Profile for user: {user.username}</p> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <Nav
        fill
        variant="underline"
        defaultActiveKey="/"
        className="custom-nav mt-3 mb-3"
      >
        {user._id === currUser._id ? (
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={generatePath("")}
              isActive={pathname === `/` ? true : false}
            >
              {" "}
              {/* Use relative path for Personal */}
              Information
            </Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={generatePath("likes")}
            isActive={pathname === `/likes` ? true : false}
          >
            {" "}
            {/* Use relative path for History */}
            Likes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={generatePath("comments")}
            isActive={pathname === `/comments` ? true : false}
          >
            {" "}
            {/* Use relative path for History */}
            Comments
          </Nav.Link>
        </Nav.Item>
        {user.role === "CHEF" ? (
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={generatePath("recipes")}
              isActive={pathname === `/recipes` ? true : false}
            >
              {" "}
              Recipes
            </Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={generatePath("following")}
            isActive={pathname === `/following` ? true : false}
          >
            {" "}
            Following
          </Nav.Link>
        </Nav.Item>
        {user.role === "CHEF" ? (
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={generatePath("followers")}
              isActive={pathname === `/followers` ? true : false}
            >
              {" "}
              Followers
            </Nav.Link>
          </Nav.Item>
        ) : (
          <></>
        )}
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={generatePath("user-favourites")}
            isActive={pathname === `/user` ? true : false}
          >
            {" "}
            Favourites
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </Container>
  );
}

export default Profile;
