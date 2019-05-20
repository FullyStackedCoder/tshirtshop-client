import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import CartItem from "../CartItem";
import calcTotalPrice from "../../lib/calcTotalCartPrice";
import { formatMoney } from "../../lib/formatMoney";
import CartCheckout from "../CartCheckout";

const ALL_CART_ITEMS_QUERY = gql`
  query ALL_CART_ITEMS_QUERY($cartId: String = "") {
    cartItems(cartId: $cartId) {
      cart_id
      quantity
      attributes
      product {
        product_id
        name
        image
        price
        discounted_price
      }
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 3rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media only screen and (max-width: ${props => props.theme.bpLarge}) {
    grid-template-columns: 1fr 2fr;
    grid-gap: 2rem;
  }
  @media only screen and (max-width: 43.75em) {
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: ${props => props.theme.bpSmallest}) {
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  }
`;

const CheckoutContainer = styled.div`
  background: white;
`;

const Checkout = styled.div`
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 0.25rem;
  .totalCost {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    font-weight: bold;
  }
  .breakline {
    width: 100%;
    margin: 1rem 0;
    height: 0.1rem;
    background-color: #e1e1e1;
  }
`;

const CartItemsList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 3rem;
`;

class Cart extends Component {
  state = {
    cartId: ""
  };

  componentDidMount = () => {
    const cartId = localStorage.getItem("cart");
    if (cartId) {
      this.setState(prevState => {
        return { cartId: cartId };
      });
    }
  };

  render() {
    return (
      <Query
        query={ALL_CART_ITEMS_QUERY}
        variables={{ cartId: this.state.cartId }}
      >
        {(data, error, loading) => {
          if (!data.data.cartItems) return <p>No items in cart...</p>;
          return (
            <>
              <p>
                {data &&
                  data.data.cartItems &&
                  `You have ${data.data.cartItems.reduce(
                    (tally, cartItem) => tally + cartItem.quantity,
                    0
                  )} items in your cart.`}
              </p>
              <Container>
                <Head>
                  <title>T-Shirt Shop - Your Cart - {data.data.cartItems.reduce(
                    (tally, cartItem) => tally + cartItem.quantity,
                    0
                  )} items</title>
                </Head>
                <CheckoutContainer>
                  <Checkout>
                    <div className="totalCost">
                      <p>Estimated Total</p>
                      <p>
                        {data &&
                          data.data.cartItems &&
                          formatMoney(calcTotalPrice(data.data.cartItems))}
                      </p>
                    </div>
                    <p>Tax calculated at checkout</p>
                    <div className="breakline" />
                    <CartCheckout currentCart={data} />
                  </Checkout>
                </CheckoutContainer>
                <CartItemsList>
                  {data &&
                    data.data.cartItems &&
                    data.data.cartItems.map(cartItem => {
                      return (
                        <CartItem
                          key={cartItem.product.product_id}
                          cartItem={cartItem}
                        />
                      );
                    })}
                </CartItemsList>
              </Container>
            </>
          );
        }}
      </Query>
    );
  }
}

export default Cart;
export { ALL_CART_ITEMS_QUERY };
