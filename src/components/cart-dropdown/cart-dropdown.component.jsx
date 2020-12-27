import React from "react";
import { CardDropdownContainer, CartItemsContainer} from "./cart-dropdown.styles";

import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CardDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span>Your cart is empty</span>
      )}
    </CartItemsContainer>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </ CardDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
