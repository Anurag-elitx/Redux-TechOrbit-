import React, { useState } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ id, model, image, color, price, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  const [isHovering, setIsHovering] = useState(false);

  const handleRemoveClick = (id) => {
    removeItem(id);
  };

  return (
    <div className="cart_heading grid grid-five-column" >
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{model}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>
      <div onMouseLeave={() => setIsHovering(false)}>
        <FaTrash
          className={`remove_icon ${isHovering ? "hover" : ""}`}
          onClick={() => handleRemoveClick(id)}
          onMouseEnter={() => setIsHovering(true)}
        />
      </div>
      ;
    </div>
  );
};

export default CartItem;
