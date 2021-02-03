import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  //It converts dollar into cents, Stripe needs this.
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51I0Z7fGuaiNNXrnbl69snEb60e23RyFJikVK4cpX4CHtWumweN0qNIlRl59aTu7rXEi0unalYpFBt0EN33hZJ7zn00Uq9jD7Td";
  //On success callback function
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((reponse) => alert("Payment Succesful"))
      .catch((error) => {
        console.error("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please sure you use the provided credit cart"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
