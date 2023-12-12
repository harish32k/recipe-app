import * as recipeClient from "../Clients/recipeClient.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Areas() {
  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    try {
      const data = await recipeClient.fetchAreas();
      setAreas(data.meals);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  return (
    <div>
      <h1>Areas</h1>
      {/* <pre>{JSON.stringify(areas, null, 2)}</pre> */}
      {areas.map((area, index) => (
        <div key={index}>
          <h3>
            {area.strArea + " "}
            <Button as={Link} to={`/app/area/${area.strArea}`}>
              View Recipes
            </Button>
          </h3>
          {/* <img src={area.strAreaThumb} alt={area.strArea} /> */}
          {/* <p>{area.strAreaDescription}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Areas;
