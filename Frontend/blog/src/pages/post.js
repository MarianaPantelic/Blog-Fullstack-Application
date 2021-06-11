import React, { useEffect, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const axios = require("axios").default;

const Post = (props) => {
  const { quill, quillRef } = useQuill();

  const userRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    checkPost();
  }, [props]);

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log("Text change!");
      });
    }
  }, [quill]);

  //console.log(clickedPost.user);

  const checkPost = async () => {
    const clickedPost = await props.posts.find((post) => post.clicked === true);
    console.log(clickedPost);
    if (clickedPost) {
      const converter = new QuillDeltaToHtmlConverter(
        clickedPost.content.ops,
        {}
      );
      const contentHTML = converter.convert();
      userRef.current.value = clickedPost.user;
      titleRef.current.value = clickedPost.title;
      quill.clipboard.dangerouslyPasteHTML(contentHTML);
    }
  };

  const addPost = async () => {
    const content = quill.getContents();
    console.log(userRef.current.value, titleRef.current.value, content, quill);
    try {
      await axios
        .post("http://localhost:3001/blog", {
          user: userRef.current.value,
          title: titleRef.current.value,
          content: content,
          clicked: false,
          likes: 0,
        })
        .then((resp) => props.sendGetRequest());
      window.location.replace("/blog");
      userRef.current.value = "";
      titleRef.current.value = "";
      quill.clipboard.dangerouslyPasteHTML("");
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async () => {
    const clickedPost = props.posts.find((post) => post.clicked === true);
    const id = clickedPost.id;
    const content = quill.getContents();
    try {
      await axios
        .put(`http://localhost:3001/blog/${id}`, {
          user: userRef.current.value,
          title: titleRef.current.value,
          content: content,
          clicked: false,
        })
        .then((resp) => props.sendGetRequest());
      userRef.current.value = "";
      titleRef.current.value = "";
      quill.clipboard.dangerouslyPasteHTML("");
      window.location.replace("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="post-container pacifico-font">
        <h2 className="mt-5">What made you smile today?</h2>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter your name"
          className="title-input mx-auto mt-5"
          ref={userRef}
        />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter your title"
          className="title-input mx-auto mt-5"
          ref={titleRef}
        />
        <div className="quill mx-auto">
          <div ref={quillRef} />
        </div>
        <div className="btn-container mx-auto">
          <Link to={"/"}>
            <button className="post-btn">Home</button>
          </Link>
          <button className="post-btn" onClick={addPost}>
            Post
          </button>
          <button className="post-btn" onClick={updatePost}>
            Update
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Post;
