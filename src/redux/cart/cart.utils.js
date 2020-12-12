export const addItemToCart = (cartItems, cartItemToCart) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToCart.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToCart.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToCart, quantity: 1 }];
};
