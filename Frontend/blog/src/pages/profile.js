import React from "react";
import { Container } from "react-bootstrap";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Profile = (props) => {
  let contentHTML = null;
  console.log(props.userPosts);

  const deletePost = async (id) => {
    try {
      axios
        .delete(
          `http://localhost:3001/blog/${id}`,
          {
            data: { _id: id },
          },
          { headers: { "x-auth": localStorage.getItem("token") } }
        )
        .then((resp) => {
          props.sendGetRequest();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id) => {
    const foundPost = props.posts.find((post) => post._id === id);
    console.log(foundPost);
    try {
      axios
        .put(
          `http://localhost:3001/blog/${id}`,
          {
            clicked: true,
          },
          { headers: { "x-auth": localStorage.getItem("token") } }
        )
        .then((resp) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <div className="blog-container d-flex flex-wrap justify-content-center ">
        {props.userPosts.length > 0 ? (
          props.userPosts.reverse().map((element) => {
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
                  <Link to={"/post"}>
                    <span
                      className="m-3"
                      onClick={() => updatePost(element._id)}
                    >
                      {" "}
                      <i class="far fa-edit fa-2x"></i>
                    </span>
                  </Link>

                  <span className="m-3" onClick={() => deletePost(element._id)}>
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

export default Profile;
