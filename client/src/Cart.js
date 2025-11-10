import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { userRequest } from "./requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const navigate = useNavigate();

  const checkout_price = shipping_fee + total_price;
  const formattedPrice = checkout_price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log("🚀 ~ file: Cart.js:40 ~ Cart ~ stripeToken:", stripeToken);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: checkout_price,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, checkout_price, navigate, cart]);

    if (cart.length === 0) {
      return (
        <>
          <Header />
          <EmptyDiv>
            <h3>No Item in Cart </h3>
          </EmptyDiv>
          <ButtonContainer>
            <NavLink to="/products">
              <Button> continue Shopping </Button>
            </NavLink>
          </ButtonContainer>
          <Footer />
        </>
      );
    }
  return (
    <>
      <Header />
      <Wrapper>
        <div className="container">
          <div className="cart_heading grid grid-five-column">
            <p>Item</p>
            <p className="cart-hide">Price</p>
            <p>Quantity</p>
            <p className="cart-hide">Subtotal</p>
            <p>Remove</p>
          </div>
          <hr />
          <div className="cart-item">
            {cart.map((curElem) => {
              return <CartItem key={curElem.id} {...curElem} />;
            })}
          </div>
          <hr />
          <div className="cart-two-button">
            <NavLink to="/products">
              <Button> continue Shopping </Button>
            </NavLink>
            <Button className="btn btn-clear" onClick={clearCart}>
              clear cart
            </Button>
          </div>

          {/* order total_amount */}
          <div className="order-total--amount">
            <div className="order-total--subdata">
              <div>
                <p>subtotal:</p>
                <p>
                  <FormatPrice price={total_price} />
                </p>
              </div>
              <div>
                <p>shipping fee:</p>
                <p>
                  <FormatPrice price={shipping_fee} />
                </p>
              </div>
              <hr />
              <div>
                <p>order total:</p>
                <p>
                  <FormatPrice price={checkout_price} />
                </p>
              </div>
            </div>
            <div className="checkout-btn">
              <StripeCheckout
                name="MobiWorld"
                description={`Your Cart total is ${formattedPrice}`} // the pop-in header subtitle
                image="https://live.staticflickr.com/65535/52814144859_857a036b18_m.jpg" // the pop-in header image (default none)
                amount={checkout_price * 100} // cents
                currency="INR"
                stripeKey={KEY}
                shippingAddress
                billingAddress
                token={onToken} // submit callback
              >
                <Button className="btn btn-checkout">CHECKOUT</Button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;
  text-align: center;
  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }

  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }

  hr {
    margin-top: 1rem;
  }

  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #fc2947;
    cursor: pointer;
    transition: transform 0.5s ease-in-out;
  }

  .remove_icon:hover,
  .remove_icon.hover {
    transform: scale(1.2);
  }

  .btn-checkout {
    margin-top: 2.5rem;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .checkout-btn {
      .btn-checkout {
      }
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
