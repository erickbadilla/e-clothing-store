import React from "react";
import { CartItemsContainer, ItemDetailsContainer } from "./cart-item.styles";
import "./cart-item.styles.scss";

const CartItem = ({ item: { imageUrl, name, quantity, price } }) => (
  <CartItemsContainer>
    <img src={imageUrl} alt="item" />

    <ItemDetailsContainer>
      <span> {name} </span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemsContainer>
);

export default React.memo(CartItem);
