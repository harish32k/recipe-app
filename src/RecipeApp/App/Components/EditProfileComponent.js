import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as userClient from "../../Clients/userClient.js";
import * as updateUserClient from "../../Clients/updateUserClient.js";
import { Button, Col, Container, Row } from "react-bootstrap";
function EditProfileComponent() {

    let { userId } = useParams();
    const currUser = useSelector((state) => state.userReducer.user);
    let loggedUserChecking = false;
    if (!userId) {
        userId = currUser._id;
        loggedUserChecking = true;
    }
    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        "email": "email@example.com",
        "dob": "1815-12-10",
        "role": "CHEF"
    });

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
        if (!(currUser.role === "GUEST")) { //&& userId === currUser._id
            fetchUserDetails();
        }
    }, [userId]);

    const formatDate = (date) => {
        const d = new Date(date);
        if (Number.isNaN(d.getTime())) {
            return date; // Return the original date if it's not a valid date string
        }
        // Format the date to YYYY-MM-DD
        return d.toISOString().split('T')[0];
    };

    const navigate = useNavigate();
    async function handleSave() {
        const response = await updateUserClient.updateUser(user._id, user);
        navigate(-1);
    }

    
    function handleCancel() {
        navigate(-1);
    }

    return (

        <Container>
            <Row className="mt-4">
                <Col md={10}>
                    <h3>Editing Profile</h3>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            required
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter first name"
                            required
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter last name"
                            required
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            required
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            required
                            value={formatDate(user.dob)}
                            onChange={(e) => setUser({ ...user, dob: e.target.value })}
                        />
                    </div>
                    <div className="btn-group float-end">
                        <Button variant="warning" type="submit" onClick={() => handleSave()}>
                            Save
                        </Button>
                        <Button variant="border-warning" type="submit" onClick={() => handleCancel()}>
                            Cancel
                        </Button>
                    </div>
                </Col>
            </Row>

        </Container>

    );
}

export default EditProfileComponent;
