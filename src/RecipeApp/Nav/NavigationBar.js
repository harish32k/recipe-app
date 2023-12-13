import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../userReducers.js";
import { clearToken } from "../tokenReducers.js";
import * as authClient from "../Clients/authClient.js";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.tokenReducer.accessToken);
  const user = useSelector((state) => state.userReducer.user);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value;
    e.target.reset();
    navigate(`/app/search?recipeName=${searchQuery}`);
  };

  const signout = async () => {
    try {
      const response = await authClient.signout(accessToken);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("err ", err);
    }
    // dispatch(clearUser());
    dispatch(setUser({ username: "Guest", role: "GUEST" }));
    dispatch(clearToken());
    navigate("/app/signin");
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Welcome {user.username}!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              Recipe App
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/app/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/app/profile">
                {/* <Nav.Link as={Link} to={`/app/user/${user._id}`}> */}
                Profile
              </Nav.Link>
              {user.role !== "GUEST" && (
                <Nav.Link as={Link} to="/app/subscription">
                  Subscriptions
                </Nav.Link>
              )}
              {user.role === "CHEF" && (
                <Nav.Link as={Link} to="/app/createPost">
                  Create Post
                </Nav.Link>
              )}
              {user.role === "ADMIN" && (
                <Nav.Link as={Link} to="/app/approvePost">
                  Approvals
                </Nav.Link>
              )}
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search for recipes"
                className="me-2"
                aria-label="Search"
                name="searchQuery"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            <Nav>
              <NavDropdown
                title="Find by"
                id="offcanvasNavbarDropdown-expand-sm"
              >
                <NavDropdown.Item as={Link} to="/app/category">
                  Category
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/app/area">
                  Area
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {user.role === "GUEST" ? (
                <>
                  <Nav.Link as={Link} to="/app/signin">
                    Sign in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/app/signup">
                    Sign up
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Button} onClick={signout}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
