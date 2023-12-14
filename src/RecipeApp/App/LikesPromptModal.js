import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LikesPromptModal = ({ show, handleClose, likes }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Liked by</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {likes ? (
          <div className="list-group">
            {likes.map((like) => (
              <Link
                key={like._id}
                to={`/app/profile/${like.userId._id}`}
                className="list-grout-item"
                style={{ textDecoration: "none" }}
              >
                {like.userId.firstName + " " + like.userId.lastName}
              </Link>
            ))}
          </div>
        ) : (
          <p>No likes yet</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LikesPromptModal;
