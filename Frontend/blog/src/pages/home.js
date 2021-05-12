import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../img/woman-570883_1920.jpg";
import img2 from "../img/ocean-1867285_1920.jpg";

const Home = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h2 className="happy-title">What makes you happy?</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={img2} alt="Second slide" />

          <Carousel.Caption className="blog-title">
            <h2>This is a blog</h2>
            <h2>about the little things</h2>
            <h2>that make me happy!</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={"holder.js/800x400?text=Third slide&bg=20232a"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
