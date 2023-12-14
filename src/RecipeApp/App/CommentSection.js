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
    console.log("newComment ", newComment);
    onAddComment(newComment);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    onDeleteComment(commentId);
    // console.log("delete ", commentId);
  };

  return (
    <div>
      <h5>Comments {`(${comments.length})`}</h5>
      <Form className="mb-2 container-fluid">
        <div className="row">
          <Form.Group className="mb-1 col-md-11">
            <Form.Control
              as="textarea"
              rows={1}
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            />
          </Form.Group>
          <Button
            variant="outline-info"
            onClick={handleAddComment}
            className="col-md-1"
          >
            Add
          </Button>
        </div>
      </Form>
      {comments.map((comment) => (
        <Card key={comment._id} style={{ width: "100%", marginBottom: "10px" }}>
          <Card.Body>
            <Card.Title>
              <span
                role="button"
                className="text-primary"
                onClick={() => navigate(`/app/profile/${comment.userId._id}`)}
                style={{ fontSize: "medium" }}
              >
                {comment.userId.firstName + " " + comment.userId.lastName}
              </span>
              {user._id === comment.userId._id && (
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteComment(comment._id)}
                  className="float-end"
                >
                  Delete
                </Button>
              )}
            </Card.Title>
            <Card.Text>{comment.strComment}</Card.Text>

            {/* <small>{comment.commentedTime}</small> */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CommentSection;
