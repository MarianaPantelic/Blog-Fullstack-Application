import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container>
      <div>
        <h2>About</h2>
        <q>Happiness is a beautiful smile!</q>
        <p>Debasish Mridha</p>
        <p>
          This is a blog about the little things that make you happy every day:
          family, friends, love, a good food, a nice place. It's about you!
        </p>
        <p>
          This is your chance to share with the world what made you happy today!
          Or just read about the things that made others happy!
        </p>
        <Link to={"/blog"}>
          <button>Read</button>
        </Link>
        <Link to={"/post"}>
          <button>Post</button>
        </Link>

        <p></p>
      </div>
    </Container>
  );
};

export default About;
