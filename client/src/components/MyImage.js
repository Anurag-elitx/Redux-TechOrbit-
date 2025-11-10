import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [], image }) => {
  const [mainImage, setMainImage] = useState(
    image ? { url: image } : imgs.length > 0 ? imgs[0] : null
  );

  const handleClick = (curElm) => {
    setMainImage(curElm);
  };

  return (
    <Wrapper>
      <div className="grid grid-three-column">
        {imgs.map((curElm, index) => {
          return (
            <figure key={index}>
              <img
                src={curElm.url}
                alt={curElm.filename}
                className={`box-image--style ${
                  mainImage.url === curElm.url ? "active" : ""
                }`}
                onClick={() => handleClick(curElm)}
              />
            </figure>
          );
        })}
        {image && (
          <figure>
            <img
              src={image}
              alt="Selected"
              className={`box-image--style ${
                mainImage.url === image ? "active" : ""
              }`}
              onClick={() => handleClick({ url: image })}
            />
          </figure>
        )}
      </div>

      <div className="main-screen">
        {mainImage && <img src={mainImage.url} alt={mainImage.filename} />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    position: relative;

    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    
      transition: all 0.3s ease;
    }

    &:hover img {
      transform: scale(1.2);
      z-index: 0;
    
    }

    &:hover::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
     
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    &:hover {
      transform: none;
      transition: none;
    }
  }

  .zoom {
    display: none;
    position: absolute;
    top: 0;
    left: 110%;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    transform: scale(0.5);
    transform-origin: left top;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    &:hover .zoom {
      display: none;
      z-index: 2;
    }
  }

  &:hover .zoom {
    display: block;
    z-index: 2;
  }

  .grid-three-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-three-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default MyImage;
