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

  const increaseLikes = async (id) => {
    const foundPost = props.posts.find((post) => post.id === id);
    console.log(foundPost.likes);
    try {
      axios
        .put(`http://localhost:3001/blog/${id}`, {
          likes: foundPost.likes + 1,
        })
        .then((resp) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <div className="blog-container d-flex flex-wrap justify-content-center ">
        {props.posts.length > 0 ? (
          props.posts.reverse().map((element) => {
            const converter = new QuillDeltaToHtmlConverter(
              element.content.ops,
              {}
            );
            contentHTML = converter.convert();
            return (
              <div className="post-box mt-5 col-lg-5 card d-flex">
                <h3 class="card-header">{element.title}</h3>
                <div class="card-body">
                  <p class="card-text">
                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{
                        __html: contentHTML,
                      }}
                    ></div>
                  </p>
                  <p className="pacifico-font">posted by: {element.user}</p>
                </div>
                <div className="d-flex justify-content-center align-items-end">
                  <span className="m-2 likes">{element.likes}</span>
                  <span
                    className="m-3"
                    onClick={() => increaseLikes(element.id)}
                  >
                    <i class="fas fa-thumbs-up fa-2x"></i>
                  </span>
                  <Link to={"/post"}>
                    <span
                      className="m-3"
                      onClick={() => updatePost(element.id)}
                    >
                      {" "}
                      <i class="far fa-edit fa-2x"></i>
                    </span>
                  </Link>

                  <span className="m-3" onClick={() => deletePost(element.id)}>
                    <i class="fas fa-trash-alt fa-2x"></i>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader">LOADING...</div>
        )}
      </div>
    </Container>
  );
};

export default Blog;
