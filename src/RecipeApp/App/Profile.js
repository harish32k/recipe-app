import { Link, useParams } from "react-router-dom";
import * as userClient from "../Clients/userClient.js";
import { useEffect } from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Tab, Button, Card, ListGroup, Nav } from "react-bootstrap";
import UserProfile from "./UserProfile.js";
import { Outlet } from "react-router-dom";

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
    if (!(currUser.role === "GUEST" && userId === currUser._id)) {
      fetchUserDetails();
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {/* <p>Profile for user: {user.username}</p> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link as={Link} to=".">
            {" "}
            {/* Use relative path for Personal */}
            Personal
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="history">
            {" "}
            {/* Use relative path for History */}
            History
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
      <UserProfile user={user} />
    </div>
  );
}

// export default Profile;

// const Profile = () => {
//   const [key, setKey] = useState("personal");

//   const personalInformation = {
//     username: "ada",
//     password: "ada123",
//     firstName: "Ada",
//     lastName: "Lovelace",
//     email: "ada@lovelace.com",
//     dob: "1815-12-10T00:00:00.000Z",
//     role: "CHEF",
//     favouriteCategories: ["beef", "goat", "vegetarian"],
//     following: ["user3", "user4"],
//     followers: ["user1", "user2"],
//   };

//   const handleFollow = () => {
//     // Implement follow logic
//   };

//   const handleUnfollow = () => {
//     // Implement unfollow logic
//   };

//   const handleEditProfile = () => {
//     // Implement edit profile logic
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-end">
//         <Button onClick={handleFollow} variant="success" className="me-2">
//           Follow
//         </Button>
//         <Button onClick={handleUnfollow} variant="danger" className="me-2">
//           Unfollow
//         </Button>
//         <Button onClick={handleEditProfile} variant="primary">
//           Edit Profile
//         </Button>
//       </div>

//       <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
//         <Tab eventKey="personal" title="Personal Information">
//           <Card style={{ width: "18rem", margin: "20px" }}>
//             <Card.Body>
//               <Card.Title>{personalInformation.username}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">
//                 {personalInformation.firstName} {personalInformation.lastName}
//               </Card.Subtitle>
//               <Card.Text>Email: {personalInformation.email}</Card.Text>
//               <Card.Text>DOB: {personalInformation.dob}</Card.Text>
//               <Card.Text>Role: {personalInformation.role}</Card.Text>
//               <Card.Text>
//                 Favourite Categories:{" "}
//                 {personalInformation.favouriteCategories.join(", ")}
//               </Card.Text>
//               <Card.Text>
//                 Following: {personalInformation.following.length}
//               </Card.Text>
//               <Card.Text>
//                 Followers: {personalInformation.followers.length}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Tab>
//         <Tab eventKey="recipeHistory" title="Recipe History">
//           {/* Recipe History content goes here */}
//           <Tabs id="recipe-history-tabs" className="flex-column">
//             <Tab eventKey="likedPosts" title="Liked Posts">
//               {/* Liked Posts content goes here */}
//             </Tab>
//             <Tab eventKey="commentedPosts" title="Commented Posts">
//               {/* Commented Posts content goes here */}
//             </Tab>
//             <Tab eventKey="subscriptionFeed" title="Subscription Feed">
//               {/* Subscription Feed content goes here */}
//             </Tab>
//           </Tabs>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

export default Profile;
