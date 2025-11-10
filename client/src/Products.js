import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";
import { useFilterContext } from "./context/filter_context";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { publicRequest } from "../requestMethods";
// import { useEffect } from "react";

const Products = () => {
  // const handleClick = () => {
  //   // scroll to the top of the product list
  //   document
  //     .querySelector(".main-product")
  //     .scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await publicRequest.get("/products/find/" + id);
  //       setProduct(res.data);
  //     } catch {}
  //   };
  //   getProduct();
  // }, [id]);



  return (
    <>
      <Header />
      {/* <Wrapper onClick={handleClick}> */}
      <Wrapper onClick={() => window.scrollTo(0, 0)}>
        <div className="container grid grid-filter-column">
          <div>
            <FilterSection />
          </div>

          <section className="product-view--sort">
            <div className="sort-filter">
              <Sort />
            </div>
            <div className="main-product">
              <ProductList />
            </div>
          </section>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
