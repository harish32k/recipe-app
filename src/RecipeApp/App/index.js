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
import HistoryRecipesComponent from "./Components/HistoryRecipesComponent.js"
import HistoryLikesComponent from "./Components/HistoryLikesComponent.js";
import HistoryCommentsComponent from "./Components/HistoryCommentsComponent.js";
import EditProfileComponent from "./Components/EditProfileComponent.js";

function RecipeApp() {
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
            <Route path="edit-profile" element={<EditProfileComponent />} />
            <Route path=":user-favourites" element={<FavouritesComponent />} />
            <Route path=":userId" element={<PersonalComponent />} />
            <Route path=":userId/history" element={<HistoryComponent />} />
            <Route path=":userId/likes" element={<HistoryLikesComponent />} />
            <Route path=":userId/comments" element={<HistoryCommentsComponent />} />
            <Route path=":userId/recipes" element={<HistoryRecipesComponent />} />
            <Route path=":userId/followers" element={<FollowersComponent />} />
            <Route path=":userId/following" element={<FollowingComponent />} />
            <Route path=":userId/user-favourites" element={<FavouritesComponent />} />
            <Route path=":userId/edit-profile" element={<EditProfileComponent />} />
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
          <Route path="/approvePost" element={<ApprovePost />} />
        </Routes>
      </div>
    </>
  );
}

export default RecipeApp;
