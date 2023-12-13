import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as favClient from "../../Clients/favouritesClient.js";

function FavouritesComponent() {

  let { userId } = useParams();
  const currUser = useSelector((state) => state.userReducer.user);
  let loggedUserChecking = false;
  if (!userId) {
    userId = currUser._id;
    loggedUserChecking = true;
  }
  const [user, setUser] = useState({});

  const fetchUserDetails = async () => {
    try {
      const response = await userClient.fetchUserById(userId);
      setUser(response);
      console.log(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  };

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, [userId]);



  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    try {
      const response = await favClient.fetchUserFavourites(userId);
      setFavourites(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  }

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchFavourites();
    }
  }, [userId]);


  return (
    <div>
      {favourites.length === 0 ? <p>There is nothing to see on this page.</p> :
        <ul className="list-group">
          {favourites.map((item, index) => (
            <li key={item._id} className="list-group-item">
              <Link to={`/app/category/${item.strCategory}`}>
                {item.strCategory}</Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default FavouritesComponent;
