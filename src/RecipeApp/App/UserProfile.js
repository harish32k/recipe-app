import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const UserProfile = ({ user }) => {
  const formattedDOB = new Date(user.dob).toLocaleDateString();
  const favoriteCategories = ["beef", "goat", "vegetarian", "chicken", "pork"];

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Button variant="warning" className="float-end">
                Edit Profile
              </Button>
              <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {user.username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Date of Birth:</strong> {formattedDOB}
              </Card.Text>
              <Card.Text>
                <strong>Role:</strong> {user.role}
              </Card.Text>
              <Card.Text>
                <strong>Favorite Categories:</strong>{" "}
                {favoriteCategories.join(", ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>{/* Additional profile information */}</Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
