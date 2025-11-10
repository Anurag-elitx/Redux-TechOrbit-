import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const { total_item } = useCartContext();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(
      "🚀 ~ file: Nav.js:19 ~ handleLogout ~ handleLogout:",
      handleLogout
    );
    console.log("🚀 ~ file: Nav.js:15 ~ Nav ~ currentUser:", currentUser);
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .navbar-welcome {
      font-size: 1.8rem;
      cursor: context-menu;
      text-transform: capitalize;
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
        font-weight: bold;
        color: #0077b5;
      }

      .cart-total--item {
        width: 2.4rem;
        font-weight: bold;
        font-size: 1.7rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #fff;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -300%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-welcome {
        font-size: 4.2rem;
        cursor: context-menu;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }

      .cart-trolley --link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 3rem;
          font-weight: 300;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={`navbar ${menuIcon ? "active" : ""}`}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                <span className="navbar-welcome">
                  Hello!! {currentUser.username}
                </span>
              </li>
              <li>
                <NavLink className="navbar-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/cart" className="cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              {total_item > 0 && (
                <span className="cart-total--item">{total_item}</span>
              )}
            </NavLink>
          </li>
        </ul>
        <button
          className="mobile-navbar-btn"
          onClick={() => setMenuIcon(!menuIcon)}
        >
          {menuIcon ? (
            <CgClose className="close-outline mobile-nav-icon" />
          ) : (
            <CgMenu className="mobile-nav-icon" />
          )}
        </button>
      </div>
    </Nav>
  );
};

export default Nav;
