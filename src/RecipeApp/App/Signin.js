import React from "react";
import * as client from "../Clients/authClient.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../userReducers.js";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../App.css";
import logo from "../../Images/orange.png";

function Signin() {
  const [error, setError] = useState("");
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
      setError(err.response.data.message);
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
      <Container>
        <Row className="justify-content-center align-items-center">
          {/* <img
            src={logo}
            alt="logo"
            className="logo"
            style={{
              width: "auto",
              height: "50%",
            }}
          /> */}
          <Col xs={12} md={6} lg={4}>
            <h2 className="text-center mb-4 mt-5">Recipe Hub</h2>
            {/* display error message in red text */}
            {error && <div className="alert alert-danger">{error}</div>}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mt-3"
                variant="outline-warning"
                onClick={signin}
              >
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* <h1>Sign in</h1>
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
      <pre> {JSON.stringify(error, null, 2)}</pre> */}
    </div>
  );
}

export default Signin;
