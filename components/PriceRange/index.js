import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const SidebarStyles = styled.div`
  font-size: 2rem;
  .heading {
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
  }
`;

const GET_MINMAX_PRICE = gql`
  query GET_MINMAX_PRICE {
    findMinMaxPrice {
      min
      max
    }
  }
`;

const UPDATE_LOCAL_MIN_MAX_PRICES = gql`
  mutation UPDATE_LOCAL_MIN_MAX_PRICES(
    $minPrice: Float = 0.00
    $maxPrice: Float = 0.00
  ) {
    updateMinMaxPrices(minPrice: $minPrice, maxPrice: $maxPrice) @client
  }
`;

class PriceRange extends Component {
  state = {
    value: null
  };
  setStateHandler = data => {
    const minMaxPrices = data.findMinMaxPrice;
    if (minMaxPrices) {
      this.setState({
        value: { min: minMaxPrices.min, max: minMaxPrices.max }
      });
    }
  };
  pricesChangedHandler = async (event, client, value) => {
    NProgress.start();
    try {
      Router.push({
        pathname: "/products"
      });
      const res = await client.mutate({
        mutation: UPDATE_LOCAL_MIN_MAX_PRICES,
        variables: { minPrice: value.min, maxPrice: value.max }
      });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
  };
  render() {
    return (
      <Query
        query={GET_MINMAX_PRICE}
        onCompleted={data => this.setStateHandler(data)}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <SidebarStyles>
              <div className="heading">Price range</div>
              <ApolloConsumer>
                {client => (
                  <InputRange
                    formatLabel={value => `$${value}`}
                    minValue={data.findMinMaxPrice.min}
                    maxValue={data.findMinMaxPrice.max}
                    value={
                      this.state.value
                        ? this.state.value
                        : {
                            min: data.findMinMaxPrice.min,
                            max: data.findMinMaxPrice.max
                          }
                    }
                    onChange={value => this.setState({ value })}
                    onChangeComplete={value =>
                      this.pricesChangedHandler(event, client, value)
                    }
                  />
                )}
              </ApolloConsumer>
            </SidebarStyles>
          );
        }}
      </Query>
    );
  }
}

export default PriceRange;
