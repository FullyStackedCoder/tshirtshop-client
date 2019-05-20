import React, { Component } from "react";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import UserNavStyles from "./styles";
import Icon from "../Icon";
import { ICONS } from "../../lib/globalIcons";
import { TOGGLE_USER_PANEL_MUTATION } from "../UserPanel";
import { LOCAL_STATE_QUERY } from "../Products";

const GET_CART_COUNT_QUERY = gql`
  query GET_CART_COUNT_QUERY($cartId: String) {
    cartItems(cartId: $cartId) {
      cart_id
      quantity
    }
  }
`;

class UserNav extends Component {
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

  getVariables = localCartId => {
    if (localCartId !== "") {
      return { cartId: localCartId };
    }
    return { cartId: this.state.cartId };
  };

  routeToCart = () => {
    Router.push({
      pathname: "/cart"
    });
  };

  handleToggleUserPanel = async (event, client) => {
    try {
      const res = await client.mutate({
        mutation: TOGGLE_USER_PANEL_MUTATION
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Query query={LOCAL_STATE_QUERY}>
        {payload => {
          return (
            <Query
              query={GET_CART_COUNT_QUERY}
              variables={this.getVariables(payload.data.localCartId)}
            >
              {(data, error, loading) => {
                return (
                  <UserNavStyles>
                    <ApolloConsumer>
                      {client => {
                        return (
                          <div
                            className="icon-box"
                            onClick={() =>
                              this.handleToggleUserPanel(event, client)
                            }
                          >
                            <Icon
                              icon={ICONS.USER}
                              size={24}
                              color="rgba(0,0,0,0.54)"
                            />
                          </div>
                        );
                      }}
                    </ApolloConsumer>
                    <div className="icon-box" onClick={this.routeToCart}>
                      <Icon
                        icon={ICONS.SHOPPINGCART}
                        size={24}
                        color="rgba(0,0,0,0.54)"
                      />
                      <div className="notification">
                        {data &&
                          data.data.cartItems &&
                          data.data.cartItems.reduce(
                            (tally, cartItem) => tally + cartItem.quantity,
                            0
                          )}
                      </div>
                    </div>
                  </UserNavStyles>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default UserNav;
export { GET_CART_COUNT_QUERY };
