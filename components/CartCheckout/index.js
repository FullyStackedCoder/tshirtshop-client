import React from "react";
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import User from "../User";
import Button from "../Button/styles";
import { TOGGLE_USER_PANEL_MUTATION } from "../UserPanel";

const loginButtonClickHandler = async (event, client) => {
  try {
    const res = await client.mutate({
      mutation: TOGGLE_USER_PANEL_MUTATION
    });
  } catch (error) {
    console.log(error);
  }
};

const checkoutButtonClickHandler = () => {
  Router.push({
    pathname: '/checkout'
  });
};

const CartCheckout = props => (
  <User>
    {({ data: { me }, loading }) => {
      if (loading) return null;
      if (!me) return (
        <ApolloConsumer>
          {client => {
            return (
              <Button onClick={event => loginButtonClickHandler(event, client)}>Login</Button>
            );
          }}
        </ApolloConsumer>
      );
      return (
        <Button
          disabled={
            !(props.currentCart && props.currentCart.data.cartItems && props.currentCart.data.cartItems.length)
          }
          onClick={checkoutButtonClickHandler}
        >
          Checkout
        </Button>
      );
    }}
  </User>
);

export default CartCheckout;
