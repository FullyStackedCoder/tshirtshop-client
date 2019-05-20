import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { GET_CART_COUNT_QUERY } from "../UserNav";
import NProgress from "nprogress";
import { ALL_CART_ITEMS_QUERY } from "../Cart";
import Button from '../Button/styles';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $cartId: String = null
    $attributes: String!
    $quantity: Int!
    $productId: ID!
  ) {
    addToCart(
      cartId: $cartId
      attributes: $attributes
      quantity: $quantity
      productId: $productId
    ) {
      cart_id
    }
  }
`;

const UPDATE_LOCAL_CARTID_MUTATION = gql`
  mutation($cartId: String) {
    updateLocalCartId(cartId: $cartId) @client
  }
`;

class AddToCart extends Component {
  state = {
    loading: false
  };

  getAttributes = (attributes) => {
    if (attributes.hasOwnProperty("Size") && attributes.hasOwnProperty("Color")) {
      return Object.entries(attributes)
      .map(e => e[1])
      .join(" ");
    }
    return "something something";
  }

  buttonClickHandler = async (event, client, props) => {
    NProgress.start();
    try {
      this.setState({ loading: true });
      let variables = {
        attributes: this.getAttributes(props.attributes),
        quantity: props.quantity,
        productId: props.productId
      };
      const cart = await localStorage.getItem("cart");
      if (cart) {
        variables = {
          cartId: cart,
          ...variables
        };
      }
      const res = await client.mutate({
        mutation: ADD_TO_CART_MUTATION,
        variables: {
          ...variables
        }
      });
      await localStorage.setItem("cart", res.data.addToCart.cart_id);
      const resp = await client.mutate({
        mutation: UPDATE_LOCAL_CARTID_MUTATION,
        variables: {
          cartId: res.data.addToCart.cart_id
        },
        refetchQueries: [
          {
            query: GET_CART_COUNT_QUERY,
            variables: { cartId: localStorage.getItem("cart") }
          },
          {
            query: ALL_CART_ITEMS_QUERY,
            variables: { cartId: localStorage.getItem("cart") }
          }
        ]
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Button
            disabled={this.state.loading}
            onClick={event =>
              this.buttonClickHandler(event, client, this.props)
            }
          >
            Add To Cart
          </Button>
        )}
      </ApolloConsumer>
    );
  }
}

export default AddToCart;
