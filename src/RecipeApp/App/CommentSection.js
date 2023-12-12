import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ comments, onAddComment, onDeleteComment }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    onDeleteComment(commentId);
  };

  return (
    <div>
      <h3>Comments</h3>
      <Form className="mb-2">
        <Form.Group className="mb-1">
          <Form.Control
            as="textarea"
            rows={1}
            cols={5}
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Form>
      {comments.map((comment) => (
        <Card
          key={comment._id}
          style={{ width: "30rem", marginBottom: "10px" }}
        >
          <Card.Body>
            <Card.Title>
              <span
                role="button"
                className="text-primary"
                onClick={() => navigate(`/app/profile/${comment.userId._id}`)}
              >
                <strong>{comment.userId.username}</strong>
              </span>
            </Card.Title>
            <Card.Text>{comment.strComment}</Card.Text>
            {user._id === comment.userId._id && (
              <Button
                variant="danger"
                onClick={handleDeleteComment(comment._id)}
              >
                Delete
              </Button>
            )}
            {/* <small>{comment.commentedTime}</small> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CommentSection;
