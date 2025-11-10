import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "./responsive";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600");
  display: flex;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px; /* Add margin to create space between form and button */
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #f2f2f2;
  font-size: 16px;
  color: #333;
  text-transform: none;
  &:focus {
    outline: none;
    border: none;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  text-align: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  transform: scale(1.2);
`;

const Button = styled.button`
  width: 100%;
  margin: auto;
  margin-top: 8px;
  border: none;
  padding: 15px 20px;
  background-color: #0077b5;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: #888;
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Label = styled.label`
font-size:14px;
  color: #333;
`;

const StyledNavLink = styled(NavLink)`
color: white;

`;

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isAgreed) {
      setError("Please agree to the terms and conditions");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful, redirect to login page
        window.location.href = "/login";
      } else {
        // Registration failed, display error message
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            <Checkbox
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              required
            />
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button
              type="submit"
               disabled={
                 !name ||
                 !lastName ||
                 !email ||
                 !username ||
                 !password ||
                 !confirmPassword
               }
            >
              Register
            </Button>
          </ButtonContainer>
        </Form>
        <Label>Already have an account?</Label>
       
        <Button>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Register;
