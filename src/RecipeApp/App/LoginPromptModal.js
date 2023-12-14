import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPromptModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You need to log in to like or comment on a post.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" as={Link} to={"/app/signin"}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginPromptModal;
