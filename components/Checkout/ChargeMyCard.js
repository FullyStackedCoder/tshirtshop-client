import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import User, { CURRENT_USER_QUERY } from "../User";
import calcTotalPrice from "../../lib/calcTotalCartPrice";
import { endpointImages } from "../../config";
import { ALL_CART_ITEMS_QUERY } from "../Cart";
import { ALL_ORDERS_QUERY } from '../Orders';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION(
    $authCode: String!
    $cartId: String
    $shippingId: Int!
  ) {
    createOrder(authCode: $authCode, cartId: $cartId, shippingId: $shippingId) {
      order_id
    }
  }
`;

const totalItems = cart => {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

const getEstimatedTotal = props => {
  let shippingCost = 0;

  let cartTotal =
    props.cart.data &&
    props.cart.data.cartItems &&
    calcTotalPrice(props.cart.data.cartItems);

  props.shippingTypes.shippings.map(shipping => {
    if (shipping.shipping_id === props.values.shippingType) {
      shippingCost = shipping.shipping_cost;
    }
  });
  return cartTotal + shippingCost;
};

class ChargeMyCard extends Component {
  state = {
    errors: null
  };
  onToken = async (res, createOrder) => {
    NProgress.start();
    // manually call the mutation once we have the stripe token
    try {
      const order = await createOrder({
        variables: {
          authCode: res.id,
          cartId: this.props.values.cartId,
          shippingId: parseInt(this.props.values.shippingType),
        },
      });
      Router.push({
        pathname: '/order',
        query: { id: order.data.createOrder.order_id },
      });
    }
    catch (error) {
      console.log(error);
      this.setState({ errors: error });
    }
    NProgress.done();
  };
  render() {
    return (
      <Mutation
        mutation={CREATE_ORDER_MUTATION}
        refetchQueries={[{ query: ALL_CART_ITEMS_QUERY, variables: { cartId: this.props.values.cartId } }, { query: ALL_ORDERS_QUERY }]}
      >
        {createOrder => (

          <StripeCheckout
            amount={getEstimatedTotal(this.props) * 100}
            name="T-Shirt Shop"
            description={`Order of ${totalItems(
              this.props.cart.data.cartItems
            )} items`}
            image={
              this.props.cart &&
              this.props.cart.data.cartItems &&
              this.props.cart.data.cartItems[0].product &&
              `${endpointImages}${
                this.props.cart.data.cartItems[0].product.image
              }`
            }
            stripeKey="pk_test_g98DSPHS9MYk2zcyetOmtF8g"
            currency="USD"
            email={this.props.user.email}
            token={res => this.onToken(res, createOrder)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </Mutation>
    );
  }
}

export default ChargeMyCard;
