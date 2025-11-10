import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './styles/Button';

const ErrorPage = () => {
  return (
  <Wrapper>
  <div className="container">
    <div>
      <h2>404</h2>
        <h2>Opps!!</h2>
        <p>We're sorry, but the page you're looking for cannot be found.Please check the URL for any typos or errors and try again.</p>
        <NavLink to="/">

        <Button>Go back to Home</Button>
        </NavLink>
    </div>
  </div>

  </Wrapper>
  )
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;
    h2 {
      font-size: 10rem;
    }
    h3 {
      font-size: 4.2rem;
    }
    p {
      margin: 2rem 0;
    }
  }
`;

export default ErrorPage;
