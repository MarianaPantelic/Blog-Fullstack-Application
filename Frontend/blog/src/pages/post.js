import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useForm } from "react-hook-form";

const Post = () => {
  const { quill, quillRef } = useQuill();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Container>
        <div className="post-container">
          <h2>What made you smile today?</h2>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter your title"
            className="title-input mx-auto"
          />
          <div className="quill mx-auto">
            <div ref={quillRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} type="file" name="picture" />
          <button>Submit</button>
        </form>
      </Container>
      <Link to={"/"}>
        <button>Back to home</button>
      </Link>
    </>
  );
};

export default Post;
