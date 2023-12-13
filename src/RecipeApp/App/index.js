import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { setUser } from "../userReducers.js";
import { useEffect } from "react";
import * as userClient from "../Clients/userClient.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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

function RecipeApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.tokenReducer.accessToken);

  const fetchUserDetails = async () => {
    try {
      const response = await userClient.fetchUserDetails(accessToken);
      dispatch(setUser(response));
      console.log("fetch ", response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
      // navigate("/main/");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [accessToken]);

  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        {/* <div className="row">
          <div className="col-2">
            <AppNav />
          </div>
          <div className="col-10"> */}
        <Routes>
          <Route path="/" element={<Navigate to="/app/home" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/subscription" element={<SubscriptionFeed />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalComponent />} />
            <Route path="history" element={<HistoryComponent />} />
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
        {/* </div>
        </div> */}
      </div>
    </>
  );
}

export default RecipeApp;
