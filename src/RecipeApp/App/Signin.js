import React from "react";
import * as client from "../Clients/authClient.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../userReducers.js";

function Signin() {
  const [error, setError] = useState({});
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      const response = await client.signin(credentials);
      console.log("logged in user ", response);
      dispatch(setUser(response));
      navigate("/app/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const refresh = async () => {
    try {
      const response = await client.refreshAccessToken();
      console.log(response);
    } catch (err) {
      console.log("err ", err);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
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
        <pre>{JSON.stringify(credentials, null, 2)}</pre>
      </div>
      <pre> {JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export default Signin;
