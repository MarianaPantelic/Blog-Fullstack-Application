import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/about";
import Blog from "./pages/blog";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import "./main.css";
import Post from "./pages/post";
import Profile from "./pages/profile";
const axios = require("axios").default;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    sendGetRequest();
  }, []);
  useEffect(() => {
    sendUserGetRequest();
  }, []);
  useEffect(() => {
    sendUserPostsGetRequest();
  }, []);
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/blog");
      setPosts(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendUserGetRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/users");
      setUsers(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendUserPostsGetRequest = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/profile");
      setUserPosts(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
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
          <Route path="/register">
            <Register users={users} sendUserGetRequest={sendUserGetRequest} />
          </Route>
          <Route path="/login">
            <Login users={users} sendUserGetRequest={sendUserGetRequest} />
          </Route>
          <Route path="/profile">
            <Profile
              userPosts={userPosts}
              sendUserPostsGetRequest={sendUserPostsGetRequest}
            />
          </Route>
        </Switch>
      </Router>
      <Nav activeKey="/home" className="px-5">
        <div className="justify-content-center d-flex mx-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/blog">Blog</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {localStorage.getItem("token") ? (
              <Nav.Link href="/post">Post</Nav.Link>
            ) : (
              <Nav.Link href="/login">Post</Nav.Link>
            )}
          </Nav.Item>
          <Nav.Item>
            {localStorage.getItem("token") ? (
              <Nav.Link onClick={logOut} className="logout">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav.Item>
        </div>
        <div className="profile">
          <Nav.Item>
            {localStorage.getItem("token") ? (
              <Nav.Link href="/profile">
                <i class="far fa-user"></i>
              </Nav.Link>
            ) : null}
          </Nav.Item>
        </div>
      </Nav>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
