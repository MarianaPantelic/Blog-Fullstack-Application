import React from "react";
import { Container, Form } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="register-container">
      <h3 className="text-center pacifico-font">Create an account</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="m-3">User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your user name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="m-3">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="m-3">Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your Password" />
        </Form.Group>

        <div className="text-center mt-5">
          <button type="submit" className="pacifico-font">
            Register
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
