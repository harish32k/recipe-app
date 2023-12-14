import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Areas() {
  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    try {
      const data = await recipeClient.fetchAreas();
      setAreas(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  return (
    <Container>
      <h1>Areas</h1>
      {/* <pre>{areas && JSON.stringify(areas, null, 2)}</pre> */}
      {areas &&
        areas.map((area, index) => (
          <div key={index} className="container">
            <h3>
              <span style={{ marginRight: "1rem" }}>{area.strArea}</span>
              <Button
                as={Link}
                to={`/app/area/${area.strArea}`}
                variant="outline-primary"
              >
                View Recipes
              </Button>
            </h3>
            <img
              src={area.strAreaThumb}
              alt={area.strArea}
              style={{ width: "100%", maxWidth: "300px" }}
            />
            <p>{area.strAreaDescription}</p>
          </div>
        ))}
    </Container>
  );
}

export default Areas;
