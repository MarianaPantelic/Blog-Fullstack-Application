import React from "react";
import { Container } from "react-bootstrap";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Blog = (props) => {
  let contentHTML = null;

  const deletePost = async (id) => {
    try {
      axios
        .delete(`http://localhost:3001/blog/${id}`, {
          data: { id: id },
        })
        .then((resp) => {
          props.sendGetRequest();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id) => {
    const foundPost = props.posts.find((post) => post.id === id);
    console.log(foundPost);
    try {
      axios
        .put(`http://localhost:3001/blog/${id}`, {
          clicked: true,
        })
        .then((resp) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <div className="blog-container d-flex flex-wrap justify-content-center ">
        {props.posts
          ? props.posts.map((element) => {
              const converter = new QuillDeltaToHtmlConverter(
                element.content.ops,
                {}
              );
              contentHTML = converter.convert();
              return (
                <div className="post-box mt-5 col-lg-5 card">
                  <h3 class="card-header">{element.title}</h3>
                  <div class="card-body">
                    <p class="card-text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contentHTML,
                        }}
                      ></div>
                    </p>
                    <p className="pacifico-font">posted by: {element.user}</p>
                  </div>
                  <button
                    className="m-3"
                    onClick={() => deletePost(element.id)}
                  >
                    Delete Post
                  </button>
                  <Link to={"/post"}>
                    <button
                      className="m-3 pacifico-font"
                      onClick={() => updatePost(element.id)}
                    >
                      {" "}
                      Update Post
                    </button>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </Container>
  );
};

export default Blog;
