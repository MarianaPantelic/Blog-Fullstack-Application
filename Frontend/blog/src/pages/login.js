import React, { useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const axios = require("axios").default;

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = async () => {
    console.log(emailRef.current.value);
    try {
      axios
        .post(`http://localhost:3001/users/login`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((resp) => {
          console.log(resp);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="login-container">
      <h3 className="text-center pacifico-font">Welcome Back!</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="m-3">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="m-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            ref={passwordRef}
          />
        </Form.Group>
        <div className="text-center">
          <button className="pacifico-font m-3" onClick={loginUser}>
            Login
          </button>
        </div>
      </Form>
      <h4 className="text-center pacifico-font m-5">Don't have an account?</h4>
      <div className="text-center">
        <Link to={"/register"}>
          <button className="pacifico-font">Register</button>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
