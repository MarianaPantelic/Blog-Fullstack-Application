import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useForm } from "react-hook-form";

const Post = () => {
  const { quill, quillRef } = useQuill();
  const [state, setState] = useState({ user: "", title: "", content: "" });

  return (
    <>
      <Container>
        <div className="post-container">
          <h2 className="mt-5">What made you smile today?</h2>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your name"
            className="title-input mx-auto mt-5"
          />
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your title"
            className="title-input mx-auto mt-5"
          />
          <div className="quill mx-auto">
            <div ref={quillRef} />
          </div>
          <Link to={"/"}>
            <button>Back to home</button>
          </Link>
          <button>Post</button>
        </div>
      </Container>
    </>
  );
};

export default Post;
