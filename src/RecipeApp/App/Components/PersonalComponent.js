// function PersonalComponent() {
//   return (
//     <div>
//       <h1>Personal Component</h1>
//     </div>
//   );
// }

// export default PersonalComponent;


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import UserProfile from "../UserProfile.js";

function PersonalComponent() {

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

  return (
    <div>
      {user._id === currUser._id ?
        <>
          <h4>Personal Information</h4>
          <UserProfile user={user} />
        </> : <p>Select any of the options above.</p>}
    </div>
  );
}

export default PersonalComponent;
