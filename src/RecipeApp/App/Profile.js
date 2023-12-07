import { useParams } from "react-router-dom";
import * as userClient from "../Clients/userClient.js";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  let { userId } = useParams();
  const currUser = useSelector((state) => state.userReducer.user);
  if (!userId) {
    userId = currUser._id;
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
    fetchUserDetails();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Profile for user: {user.username}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default Profile;
