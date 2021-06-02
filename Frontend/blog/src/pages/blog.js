import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
const axios = require("axios").default;

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      axios.get("http://localhost:3001/blog").then((resp) => {
        setPosts(resp.data);
        console.log(resp.data);
      });
    } catch (error) {
      //catching rejected requests
      console.log(error);
    }
  };
  console.log(posts);
  let contentHTML = null;

  return (
    <Container className="mt-5">
      {posts
        ? posts.map((element) => {
            const converter = new QuillDeltaToHtmlConverter(
              element.content.ops,
              {}
            );
            contentHTML = converter.convert();
            return (
              <div class="row">
                <div class="col-lg-4">
                  <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                    <div class="features-icons-icon d-flex">
                      <i class="icon-screen-desktop m-auto text-danger"></i>
                    </div>
                    <h3>{element.title}</h3>
                    <p class="lead mb-0">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contentHTML,
                        }}
                      ></div>
                    </p>
                    <p>posted by: {element.user}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </Container>
  );
};

export default Blog;
