import React from "react";
import { Button, Carousel } from "react-bootstrap";
import img1 from "../img/woman-570883_1920.jpg";
import img2 from "../img/ocean-1867285_1920.jpg";
import { Link } from "react-router-dom";

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
            <h2>that make us happy!</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={"holder.js/800x400?text=Third slide&bg=20232a"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <div className="smiley-title">
              <h2>Tell me</h2>
              <h2>
                what made you <i class="fas fa-smile-wink"></i> today
              </h2>
            </div>
            <Link to={"/post"}>
              <Button>Post</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
