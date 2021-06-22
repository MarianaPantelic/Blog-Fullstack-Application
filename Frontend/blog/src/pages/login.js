import React from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  return (
    <Container className="login-container">
      <h3 className="text-center pacifico-font">Welcome Back!</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="m-3">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="m-3">Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your Password" />
        </Form.Group>
        <div className="text-center">
          <button type="submit" className="pacifico-font m-3">
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
