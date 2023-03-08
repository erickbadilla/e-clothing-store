import React from "react";
import { IconContainer, ShoppingIcon } from "./cart-icon.styles";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <IconContainer onClick={toggleCartHidden}>
    <ShoppingIcon />
    <span>{itemCount}</span>
  </IconContainer>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
