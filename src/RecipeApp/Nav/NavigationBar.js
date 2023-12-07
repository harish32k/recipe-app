import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value;
    navigate(`/app/search?recipeName=${searchQuery}`);
  };
  return (
    <Navbar expand="sm" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Recipe App
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
                Profile
              </Nav.Link>
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
