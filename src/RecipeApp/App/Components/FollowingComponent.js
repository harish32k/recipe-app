import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as followClient from "../../Clients/followClient.js";

function FollowingComponent() {

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

  const [followings, setFollowings] = useState([]);

  const fetchFollowings = async () => {
    try {
      const response = await followClient.followingUsers(userId);
      setFollowings(response);
    } catch (err) {
      // setError(err);
      console.log("error ", err);
    }
  }

  useEffect(() => {
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchFollowings();
    }
  }, [userId]);
  return (
    <div>
      {followings.length === 0 ? <p>There is nothing to see on this page.</p> :
        <ul className="list-group">
          {followings.map((item, index) => (
            <li key={item._id} className="list-group-item">
              <Link to={`/app/profile/${item.followId._id}`}>
                {item.followId.firstName + " " + item.followId.lastName}</Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default FollowingComponent;
