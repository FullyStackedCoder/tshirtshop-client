import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Router from "next/router";
import styled from "styled-components";
import User from "../User";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { ALL_CART_ITEMS_QUERY } from "../Cart";
import Button from "../Button/styles";

const Center = styled.div`
  text-align: center;
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
`;

const ALL_SHIPPING_REGIONS_QUERY = gql`
  query ALL_SHIPPING_REGIONS_QUERY {
    shippingRegions {
      shipping_region_id
      shipping_region
    }
  }
`;

const ALL_SHIPPING_TYPES_QUERY = gql`
  query ALL_SHIPPING_REGIONS_QUERY {
    shippings {
      shipping_id
      shipping_type
      shipping_cost
      shipping_region_id
    }
  }
`;

const Composed = adopt({
  shippingRegions: ({ render }) => (
    <Query query={ALL_SHIPPING_REGIONS_QUERY}>{render}</Query>
  ),
  shippingTypes: ({ render }) => (
    <Query query={ALL_SHIPPING_TYPES_QUERY}>{render}</Query>
  ),
  cart: ({ cartId, render }) => (
    <Query query={ALL_CART_ITEMS_QUERY} variables={{ cartId: cartId }}>
      {render}
    </Query>
  )
});

class Checkout extends Component {
  state = {
    showStep1: true,
    showStep2: true,
    showStep3: true,
    showStep4: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    shipping: 1,
    shippingType: 0,
    shippingRegions: [],
    shippingTypes: [],
    cartId: ""
  };

  saveAndContinue = step => {
    this.setState(prevState => {
      return {
        [step]: !prevState[step]
      };
    });
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setStateHandler = data => {
    const me = data.me;
    if (me) {
      this.setState({
        firstName: me.name.split(" ")[0] ? me.name.split(" ")[0] : "",
        lastName: me.name.split(" ")[1] ? me.name.split(" ")[1] : "",
        address: me.address_1 ? me.address_1 : "",
        city: me.city ? me.city : "",
        state: me.region ? me.region : "",
        country: me.country ? me.country : "",
        zipcode: me.postal_code ? me.postal_code : "",
        shipping: me.shipping_region_id ? me.shipping_region_id : 1
      });
    }
  };

  shopButtonClickHandler = () => {
    try {
      Router.push({
        pathname: "/"
      });
    } catch (error) {
      console.log(error);
    }
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
    const { showStep1, showStep2, showStep3, showStep4 } = this.state;
    return (
      <User onCompleted={data => this.setStateHandler(data)}>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          return (
            <Composed cartId={this.state.cartId}>
              {({ shippingRegions, shippingTypes, cart }) => {
                if (!me)
                  return (
                    <Center>
                      <Container>
                        <Step1
                          user={me}
                          saveAndContinue={this.saveAndContinue}
                          cart={cart}
                        />
                      </Container>
                    </Center>
                  );
                if (
                  cart &&
                  cart.data.cartItems &&
                  !cart.data.cartItems.length
                )
                  return (
                    <Center>
                      <Container>
                        <p style={{ marginBottom: "3rem" }}>
                          You have no items in your cart for checkout.<br/> Please
                          click the below button to go to our shop and add the
                          products you like to the cart for checkout
                        </p>
                        <Button onClick={this.shopButtonClickHandler}>
                          Go to shop
                        </Button>
                      </Container>
                    </Center>
                  );
                if (showStep2) {
                  return (
                    <Container>
                      <Step2
                        changed={event => this.saveToState(event)}
                        values={this.state}
                        user={me}
                        saveAndContinue={this.saveAndContinue}
                        shippingRegions={shippingRegions.data}
                        shippingTypes={shippingTypes.data}
                      />
                    </Container>
                  );
                }
                if (showStep3) {
                  return (
                    <Container>
                      <Step3
                        changed={event => this.saveToState(event)}
                        values={this.state}
                        user={me}
                        saveAndContinue={this.saveAndContinue}
                        shippingRegions={shippingRegions.data}
                        shippingTypes={shippingTypes.data}
                      />
                    </Container>
                  );
                }
                if (showStep4) {
                  return (
                    <center>
                      <Container>
                        <Step4
                          changed={event => this.saveToState(event)}
                          values={this.state}
                          user={me}
                          saveAndContinue={this.saveAndContinue}
                          shippingRegions={shippingRegions.data}
                          shippingTypes={shippingTypes.data}
                          cart={cart}
                        />
                      </Container>
                    </center>
                  );
                }
              }}
            </Composed>
          );
        }}
      </User>
    );
  }
}

export default Checkout;
