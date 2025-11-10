import React from "react";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

const About = () => {
  const data = {
    Name: "MobiWorld Ecommerce Website",
  };

  return (
    <>
      <Header />
      <HeroSection myData={data} />
      <Footer />
    </>
  );
};

export default About;
