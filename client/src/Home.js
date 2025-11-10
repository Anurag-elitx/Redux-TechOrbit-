import React from "react";
import FeatureProduct from "./components/FeatureProduct";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = () => {
  const data = {
    Name: "MobiWorld",
  };

  return (
    <>
      <Header />
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
      <Footer />
    </>
  );
};

export default Home;
