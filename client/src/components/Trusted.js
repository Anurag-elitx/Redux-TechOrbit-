import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trusted = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 990,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper className="brand-section">
      <div className="container">
        <h3>Trusted by 700+ companies</h3>
        <Slider {...settings}>
          <div className="slide">
            <img src="images/apple.png" alt="trusted-barnds" />
          </div>
          <div className="slide">
            <img src="images/nokia.png" alt="trusted-barnds" />
          </div>
          <div className="slide">
            <img src="images/samsung.png" alt="trusted-barnds" />
          </div>
          <div className="slide">
            <img src="images/vivo.png" alt="trusted-barnds" />
          </div>
          <div className="slide">
            <img src="images/lg.png" alt="trusted-barnds" />
          </div>
          <div className="slide">
            <img src="images/motorola.png" alt="trusted-barnds" />
          </div>
        </Slider>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  .brand-section {
    padding: 12rem 0 0 0;
  }
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2.5rem;
  }
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .slick-slide div {
    outline: none;
  }
  .slick-slide img {
    margin: 0 auto;
  }
  .slick-prev:before,
  .slick-next:before {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
  }
  .slick-prev:before {
    content: "<";
  }
  .slick-next:before {
    content: ">";
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      margin-top: 3.2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* background-color: red; */
      text-align: center;
    }
  }
`;

export default Trusted;

