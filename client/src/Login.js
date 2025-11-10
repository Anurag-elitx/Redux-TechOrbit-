import styled from "styled-components";
import { useState } from "react";
import { mobile } from "./responsive";
import { login } from "./redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
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

const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 15px 20px;
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

const StyledNavLink = styled(NavLink)`
  margin: 5px 0px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: #0077b5;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 40%;
  margin: auto;
  margin-top: 8px;
  border: none;
  padding: 15px 20px;
  background-color: rgb(0, 119, 181);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: #888;
    cursor: not-allowed;
    background-color: #eee;
  }
`;


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      login(dispatch, { username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              className="sc-jItqcz khIWxi"
              autocomplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            

            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>Something went wrong...</Error>}

            <StyledNavLink to="/register">CREATE AN ACCOUNT</StyledNavLink>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
