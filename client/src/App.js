import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Products from "./Products";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Register from "./Register";
import Login from "./Login";
import Success from "./Success";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useSelector } from "react-redux";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#ffff",
      black: " #212529",
      helper: "	#0077b5",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(0,119,181)",
      border: "rgba(0,119,181,0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(0,119,181) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(255 255 255) 0px 1px 3px 0px,rgba(255 255 255) 0px 0px 0px 1px;",

      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <PropagateLoader color="rgb(0,119,181)" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/singleproduct/:id" element={<SingleProduct />} />
            {currentUser ? (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/logout"
                  element={<Navigate to="/login" replace />}
                />
                <Route path="/success" element={<Success />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/cart"
                  element={<Navigate to="/login" replace />}
                />
              </>
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
