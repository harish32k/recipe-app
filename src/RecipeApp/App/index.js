import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { setUser, clearUser } from "../userReducers.js";
import { useEffect } from "react";
import * as userClient from "../Clients/userClient.js";
import * as authClient from "../Clients/authClient.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../tokenReducers.js";
import { useSelector } from "react-redux";
import Home from "./Home.js";
import Profile from "./Profile.js";
import Search from "./Search.js";
import AppNav from "../Nav/AppNav.js";
import PostDetails from "./PostDetails.js";
import NavigationBar from "../Nav/NavigationBar.js";

function RecipeApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.tokenReducer.accessToken);
  const user = useSelector((state) => state.userReducer.user);

  const fetchUserDetails = async () => {
    try {
      const response = await userClient.fetchUserDetails(accessToken);
      dispatch(setUser(response));
    } catch (err) {
      // setError(err);
      console.log("error ", err);
      navigate("/main/");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const signout = async () => {
    try {
      const response = await authClient.signout(accessToken);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("err ", err);
    }
    dispatch(clearUser());
    dispatch(clearToken());
    navigate("/main/");
  };
  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <AppNav />
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={signout}>Logout</button>
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Navigate to="/app/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post/:postId" element={<PostDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeApp;
