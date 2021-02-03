import React from "react";
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles";

import { connect } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({
  cartItem,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
}) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img alt="item" src={imageUrl} />
      </ImageContainer>

      <TextContainer className="name">{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItemFromCart(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItemToCart(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer className="price">{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItemFromCart(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
