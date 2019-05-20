import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import NProgress from "nprogress";
import Link from "next/link";
import { endpointImages } from "../../config";
import { formatMoney, pickPrice, oldPrice } from "../../lib/formatMoney";
import QuantitySelectorStyles from "../QualitySelector/styles";
import Icon from "../Icon";
import { ICONS } from "../../lib/globalIcons";
import { ALL_CART_ITEMS_QUERY } from "../Cart";

const CartItemStyles = styled.div`
  max-width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr 3fr;
  grid-auto-flow: column;
  padding: 2rem;
  position: relative;
  img {
    height: 100%;
    display: block;
    object-fit: contain;
  }
  .details {
    margin: 0rem 2rem;
    font-size: 1.6rem;
  }
`;

const CloseButton = styled.button`
  color: black;
  font-size: 3rem;
  padding: 0 1rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0.5rem;
  top: 0;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`;

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($cartId: String, $productId: ID!) {
    removeFromCart(cartId: $cartId, productId: $productId) {
      cart_id
    }
  }
`;

const INCREMENT_CART_ITEM_MUTATION = gql`
  mutation INCREMENT_CART_ITEM_MUTATION($cartId: String, $productId: ID!) {
    incrementCartItem(cartId: $cartId, productId: $productId) {
      cart_id
    }
  }
`;

const DECREMENT_CART_ITEM_MUTATION = gql`
  mutation DECREMENT_CART_ITEM_MUTATION($cartId: String, $productId: ID!) {
    decrementCartItem(cartId: $cartId, productId: $productId) {
      cart_id
    }
  }
`;

const handleCartItemDelete = async (event, client, props) => {
  NProgress.start();
  try {
    const res = await client.mutate({
      mutation: DELETE_CART_ITEM_MUTATION,
      variables: {
        cartId: props.cartItem.cart_id,
        productId: props.cartItem.product.product_id
      },
      refetchQueries: [
        {
          query: ALL_CART_ITEMS_QUERY,
          variables: { cartId: props.cartItem.cart_id }
        }
      ]
    });
  } catch (error) {
    console.log(error);
  }
  NProgress.done();
};

const handleCartItemIncrement = async (event, client, props) => {
  NProgress.start();
  try {
    const res = await client.mutate({
      mutation: INCREMENT_CART_ITEM_MUTATION,
      variables: {
        cartId: props.cartItem.cart_id,
        productId: props.cartItem.product.product_id
      },
      refetchQueries: [
        {
          query: ALL_CART_ITEMS_QUERY,
          variables: { cartId: props.cartItem.cart_id }
        }
      ]
    });
  } catch (error) {
    console.log(error);
  }
  NProgress.done();
}

const handleCartItemDecrement = async (event, client, props) => {
  try {
    if (props.cartItem.quantity > 1) {
      NProgress.start();
      const res = await client.mutate({
        mutation: DECREMENT_CART_ITEM_MUTATION,
        variables: {
          cartId: props.cartItem.cart_id,
          productId: props.cartItem.product.product_id
        },
        refetchQueries: [
          {
            query: ALL_CART_ITEMS_QUERY,
            variables: { cartId: props.cartItem.cart_id }
          }
        ]
      });
    }
  } catch (error) {
    console.log(error);
  }
  NProgress.done();
}

const CartItem = props => (
  <CartItemStyles>
    <img
      src={`${endpointImages}${props.cartItem.product.image}`}
      alt={props.cartItem.product.name}
    />
    <div className="details">
      <Link
        href={{
          pathname: "/product",
          query: { id: props.cartItem.product.product_id }
        }}
      >
        <a>
          <h3 className="headingTertiary">{props.cartItem.product.name}</h3>
        </a>
      </Link>
      <ApolloConsumer>
        {client => {
          return (
            <>
              <CloseButton
                title="close"
                onClick={event => handleCartItemDelete(event, client, props)}
              >
                &times;
              </CloseButton>
              <p>
                {pickPrice(
                  props.cartItem.product.price,
                  props.cartItem.product.discounted_price
                )}{" "}
                x {props.cartItem.quantity}
              </p>
              <QuantitySelectorStyles>
                <p>Quantity:</p>
                <div
                  className="selectors"
                  name="decrease"
                  onClick={event => handleCartItemDecrement(event, client, props)}
                >
                  <Icon
                    icon={ICONS.CHEVRONDOWN}
                    size={24}
                    color="rgba(0,0,0,0.74)"
                  />
                </div>
                <p>{props.cartItem.quantity}</p>
                <div
                  className="selectors"
                  name="increase"
                  onClick={event => handleCartItemIncrement(event, client, props)}
                >
                  <Icon
                    icon={ICONS.CHEVRONUP}
                    size={24}
                    color="rgba(0,0,0,0.74)"
                  />
                </div>
              </QuantitySelectorStyles>
              <p>Selected Size: {props.cartItem.attributes.split(" ")[0]}</p>
              <p>Selected Color: {props.cartItem.attributes.split(" ")[1]}</p>
            </>
          );
        }}
      </ApolloConsumer>
    </div>
  </CartItemStyles>
);

export default CartItem;
