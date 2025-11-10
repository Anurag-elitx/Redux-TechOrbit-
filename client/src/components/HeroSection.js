import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button} from "../styles/Button"

const HeroSection = ({myData}) => {

    const {Name} = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to</p>
            <h1>{Name}</h1>
            <p>
              Welcome to our MobiWorld, where shopping is just a tap away! Our
              platform offers a seamless and convenient shopping experience for
              customers on-the-go, with a wide range of products available at
              your fingertips. From fashion to electronics, home decor to beauty
              products, we have everything you need to make your shopping
              experience a breeze. Our user-friendly interface allows you to
              easily browse, search and purchase items, all while enjoying
              secure payment options and fast delivery. Whether you're looking
              for the latest fashion trends or a gift for a loved one. Shop now
              and discover the convenience of shopping on-the-go!
            </p>
            <NavLink to="/products" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button>
                        Shop Now
                </Button>
            </NavLink>
            </div>
            {/* Hero Section Image */}

            <div className="hero-section-image">
    <figure>
        <img src="https://live.staticflickr.com/65535/52813948396_576c667e09.jpg" alt="hero" className="img-style" />
    </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 12rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
      font-size: 2rem;
    font-weight: bolder;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(0,119,181,0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    transition: transform 1.0s ease-in-out;
    height: auto;
  }

  &:hover .img-style {
    transform: scale(1.1);
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(0,119,181,0.5);
    }
  }
`;

export default HeroSection;
