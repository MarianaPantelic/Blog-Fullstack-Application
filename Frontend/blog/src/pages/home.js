import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../img/woman-570883_1920.jpg";
import img2 from "../img/ocean-1867285_1920.jpg";
import img3 from "../img/heart-692312_1920.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
        <img className="d-block w-100" src={img1} alt="First slide" />
        <Carousel.Caption>
          <h2 className="happy-title pacifico-font">What makes you happy?</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img className="d-block w-100" src={img2} alt="Second slide" />
        <Carousel.Caption className="blog-title pacifico-font">
          <h2>This is a blog</h2>
          <h2>about the little things</h2>
          <h2>that make us happy!</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img className="d-block w-100" src={img3} alt="Third slide" />
        <Carousel.Caption>
          <h2 className="smiley-title pacifico-font">
            What made you <i class="fas fa-smile-wink"></i> today?
          </h2>
          <Link to={"/post"}>
            <div className="home-btn pacifico-font">Post</div>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
