import React from "react";
import * as client from "../Clients/authClient.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAccessToken, setRefreshToken } from "../tokenReducers.js";

function Signin() {
  const [error, setError] = useState({});
  const [user, setUser] = useState({ username: "", role: "" });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.tokenReducer.accessToken);
  const refreshToken = useSelector((state) => state.tokenReducer.refreshToken);

  const signin = async () => {
    try {
      const response = await client.signin(credentials);

      dispatch(setAccessToken(response.accessToken));
      dispatch(setRefreshToken(response.refreshToken));

      navigate("/app/home");
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  };

  const refresh = async () => {
    try {
      const response = await client.refreshAccessToken(refreshToken);
      console.log(response);
      dispatch(setAccessToken(response.accessToken));
    } catch (err) {
      // setError(err);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      {/* <pre> {JSON.stringify(error, null, 2)}</pre> */}
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
      <button onClick={refresh}>Refresh</button>

      <div className="container">
        <h2>Hello {user.username ? user.username : "Guest"}</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
        <pre>{JSON.stringify(refreshToken, null, 2)}</pre>
        <pre>{JSON.stringify(credentials, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Signin;
