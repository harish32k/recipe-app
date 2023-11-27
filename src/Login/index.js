import React from "react";
import * as client from "../Clients/authClient.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  clearToken,
} from "../tokenReducers.js";

function Login() {
  // const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", role: "" });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.tokenReducer.accessToken);
  const refreshToken = useSelector((state) => state.tokenReducer.refreshToken);

  const signin = async () => {
    try {
      const response = await client.signin(credentials);
      console.log(response);
      dispatch(setAccessToken(response.accessToken));
      dispatch(setRefreshToken(response.refreshToken));
      await posts();
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  };

  const refresh = async () => {
    try {
      const response = await client.refreshToken(refreshToken);
      console.log(response);
      dispatch(setAccessToken(response.accessToken));
    } catch (err) {
      // setError(err);
    }
  };

  const posts = async () => {
    try {
      const response = await client.posts(accessToken);
      console.log(response);
      setUser(response);
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  };

  const signout = async () => {
    try {
      const response = await client.signout(accessToken);
      console.log(response);
      dispatch(clearToken());
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <p>{error}</p> */}
      <input
        type="text"
        placeholder="username"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={signin}>Login</button>
      <button onClick={posts}>Posts</button>
      <button onClick={refresh}>Refresh</button>
      <button onClick={signout}>Logout</button>

      <div className="container">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
        <pre>{JSON.stringify(refreshToken, null, 2)}</pre>
        <pre>{JSON.stringify(credentials, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Login;
