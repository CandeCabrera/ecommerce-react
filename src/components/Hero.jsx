import React from "react";
import appleHero from "../assets/2.png";
import samsungHero from "../assets/3.png";
import Carousel from "react-bootstrap/Carousel";

const Hero = ({ filterSamsung, filterApple }) => {
  return (
    <main>
     
      <Carousel interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={appleHero}
            alt="First slide"
          />
          <Carousel.Caption>
            <button onClick={filterApple} className="hero-bttns apple-bttn">View all</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={samsungHero}
            alt="First slide"
          />
          <Carousel.Caption>
            <button onClick={filterSamsung} className="hero-bttns samsung-bttn">Show Samsung</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <img src="https://webobjects2.cdw.com/is/image/CDW//apple-hero-757?$%20$&$transparent$" alt="" />
            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/trade-in-og-202205?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1649887002751" alt="" /> */}
      
    </main>
  );
};

export default Hero;
