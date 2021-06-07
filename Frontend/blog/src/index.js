import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/about";
import Blog from "./pages/blog";
import Home from "./pages/home";
import "./main.css";
import Post from "./pages/post";
const axios = require("axios").default;

const App = () => {
  const [posts, setPosts] = useState([
    {
      user: "",
      title: "",
      content: "",
      clicked: false,
    },
  ]);
  useEffect(() => {
    sendGetRequest();
  }, []);
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/blog");
      setPosts(resp.data);
      console.log(resp.data);
    } catch (error) {
      //catching rejected requests
      console.log(error);
    }
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog">
            <Blog posts={posts} sendGetRequest={sendGetRequest} />
          </Route>
          <Route path="/post">
            <Post posts={posts} sendGetRequest={sendGetRequest} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/blog">Blog</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/post">Post</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
