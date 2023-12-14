import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import Profile from "./Profile.js";
import Search from "./Search.js";
import PostDetails from "./PostDetails.js";
import NavigationBar from "../Nav/NavigationBar.js";
import Signin from "./Signin.js";
import Categories from "./Categories.js";
import Areas from "./Areas.js";
import CategoryPosts from "./CategoryPosts.js";
import AreasPosts from "./AreasPosts.js";
import UserProfile from "./UserProfile.js";
import PersonalComponent from "./Components/PersonalComponent.js";
import HistoryComponent from "./Components/HistoryComponent.js";
import CreatePost from "./CreatePost.js";
import ApprovePost from "./ApprovePost.js";
import Signup from "./Signup.js";
import SubscriptionFeed from "./SubscriptionFeed.js";
import FollowersComponent from "./Components/FollowersComponent.js";
import FollowingComponent from "./Components/FollowingComponent.js";
import FavouritesComponent from "./Components/FavouritesComponent.js";
import HistoryRecipesComponent from "./Components/HistoryRecipesComponent.js";
import HistoryLikesComponent from "./Components/HistoryLikesComponent.js";
import HistoryCommentsComponent from "./Components/HistoryCommentsComponent.js";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomAlert from "./Components/CustomAlert.js";
import { useState } from "react";

function RecipeApp() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkValidPathPermission = () => {
    if (
      ((pathname.includes("/app/profile") ||
        pathname.includes("/app/subscription")) &&
        user.role === "GUEST") ||
      (pathname.includes("/app/createPost") && user.role !== "CHEF") ||
      (pathname.includes("/app/approvePost") && user.role !== "ADMIN")
    ) {
      setAlertMessage("You are not authorized to view this page");
      setShowAlert(true);
      navigate("/app");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    checkValidPathPermission();
  }, [pathname]);

  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Navigate to="/app/home" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/subscription" element={<SubscriptionFeed />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalComponent />} />
            <Route path="history" element={<HistoryComponent />} />
            <Route path="likes" element={<HistoryLikesComponent />} />
            <Route path="comments" element={<HistoryCommentsComponent />} />
            <Route path="recipes" element={<HistoryRecipesComponent />} />
            <Route path="followers" element={<FollowersComponent />} />
            <Route path="following" element={<FollowingComponent />} />
            <Route path=":user-favourites" element={<FavouritesComponent />} />
            <Route path=":userId" element={<PersonalComponent />} />
            <Route path=":userId/history" element={<HistoryComponent />} />
            <Route path=":userId/likes" element={<HistoryLikesComponent />} />
            <Route
              path=":userId/comments"
              element={<HistoryCommentsComponent />}
            />
            <Route
              path=":userId/recipes"
              element={<HistoryRecipesComponent />}
            />
            <Route path=":userId/followers" element={<FollowersComponent />} />
            <Route path=":userId/following" element={<FollowingComponent />} />
            <Route
              path=":userId/user-favourites"
              element={<FavouritesComponent />}
            />
          </Route>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryPosts />} />
          <Route path="/area" element={<Areas />} />
          <Route path="/area/:area" element={<AreasPosts />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/createPost/:id" element={<CreatePost />} />
          <Route path="/approvePost" element={<ApprovePost />} />
        </Routes>
      </div>
      {showAlert && (
        <CustomAlert
          show={showAlert}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
}

export default RecipeApp;
