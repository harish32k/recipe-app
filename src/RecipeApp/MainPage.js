import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainNav from "./Nav/MainNav.js";
import Signup from "./App/Signup.js";
import Signin from "./App/Signin.js";
import Welcome from "./MainPage/Welcome.js";
import Home from "./App/Home.js";
import Profile from "./App/Profile.js";
import Search from "./App/Search.js";
import NavigationBar from "./Nav/NavigationBar.js";

function MainPage() {
  return (
    // <div className="container-fluid pt-3">
    <div className="container-fluid">
      {/* <div className="row"> */}
      {/* <div className="col-2"> */}
      {/* <MainNav /> */}
      <NavigationBar />
      {/* </div> */}
      {/* <div className="col-10"> */}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/main/welcome" />} /> */}
        {/* <Route path="/welcome" element={<Welcome />} /> */}
        <Route path="/" element={<Navigate to="/app/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

// export default MainPage;
