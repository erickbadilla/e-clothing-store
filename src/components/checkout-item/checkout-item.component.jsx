import React from "react";
import "./checkout.styles.scss";

const CheckoutItem = ({ cartItem: { imageUrl, name, price, quantity } }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img alt="item" src={imageUrl} />
    </div>

    <span className="name">{name}</span>
    <span className="quantity">{price}</span>
    <span className="price">{quantity}</span>
    <div className="remove-button">&#10005;</div>
  </div>
);

export default CheckoutItem;
