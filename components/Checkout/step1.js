import React from "react";
import { ApolloConsumer } from "react-apollo";
import User from "../User";
import Router from "next/router";
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

const shopButtonClickHandler = () => {
  try {
    Router.push({
      pathname: "/"
    });
  } catch (error) {
    console.log(error);
  }
};

const Step1 = props => {
  if (!props.user)
    return (
      <ApolloConsumer>
        {client => {
          return (
            <>
              <p>
                You need to be a registered user and logged into you account to
                checkout.
              </p>
              <p style={{ marginBottom: "2rem" }}>
                Click the button below to login or registed for an account if
                you haven't registered yet.
              </p>
              <Button onClick={event => loginButtonClickHandler(event, client)}>
                Let me Checkout
              </Button>
            </>
          );
        }}
      </ApolloConsumer>
    );
  // if (
  //   props.cart &&
  //   props.cart.data.cartItems &&
  //   !props.cart.data.cartItems.length
  // ) {
  //   return (
  //     <>
  //       <p style={{ marginBottom: "2rem" }}>
  //         You have no items in your cart. Click the button below to go to our
  //         shop.
  //       </p>
  //       <Button onClick={shopButtonClickHandler}>Go to shop</Button>
  //     </>
  //   );
  // }
  // return <p>this is {props.saveAndContinue("showStep1")}</p>
  return <p>You are logged in...</p>
};

export default Step1;
