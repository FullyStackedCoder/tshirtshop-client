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

const InputStyles = styled.div`
  .inputRange {
    height: 4rem;
    position: relative;
    width: 100%;
  }
  .inputRange__slider {
    appearance: none;
    background: #0590c7;
    border: 1px solid #0590c7;
    border-radius: 100%;
    cursor: pointer;
    display: block;
    height: 1rem;
    margin-left: -0.5rem;
    margin-top: -0.65rem;
    outline: none;
    position: absolute;
    top: 50%;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    width: 1rem;
  }
  .inputRange__slider:active {
    transform: scale(1.3);
  }
  .inputRange__slider:focus {
    box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2);
  }
  .inputRange--disabled .inputRange__slider {
    background: #cccccc;
    border: 1px solid #cccccc;
    box-shadow: none;
    transform: none;
  }

  .inputRange__slider-container {
    transition: left 0.3s ease-out;
  }
  .valueLabel {
    color: #aaaaaa;
    font-family: "Helvetica Neue", san-serif;
    font-size: 1.6rem;
    transform: translateZ(0);
    white-space: nowrap;
  }

  .inputRange__label--min,
  .inputRange__label--max {
    bottom: -1.4rem;
    position: absolute;
  }

  .inputRange__label--min {
    left: 0;
  }

  .inputRange__label--max {
    right: 0;
  }

  .inputRange__label--value {
    position: absolute;
    top: -3.2rem;
  }

  .inputRange__label-container {
    left: -50%;
    position: relative;
  }
  .inputRange__label--max .inputRange__label-container {
    left: 50%;
  }

  .inputRange__track {
    background: #eeeeee;
    border-radius: 0.3rem;
    cursor: pointer;
    display: block;
    height: 0.3rem;
    position: relative;
    transition: left 0.3s ease-out, width 0.3s ease-out;
  }
  .inputRange--disabled .inputRange__track {
    background: #eeeeee;
  }

  .inputRange__track--background {
    left: 0;
    margin-top: -0.15rem;
    position: absolute;
    right: 0;
    top: 50%;
  }

  .inputRange__track--active {
    background: #0590c7;
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
                  <InputStyles>
                    <InputRange
                      formatLabel={value => `$${value}`}
                      classNames={{
                        valueLabel: "valueLabel",
                        inputRange: "inputRange",
                        activeTrack:
                          "inputRange__track inputRange__track--active",
                        disabledInputRange: "inputRange inputRange--disabled",
                        labelContainer: "inputRange__label-container",
                        maxLabel: "inputRange__label inputRange__label--max",
                        minLabel: "inputRange__label inputRange__label--min",
                        slider: "inputRange__slider",
                        sliderContainer: "inputRange__slider-container",
                        track:
                          "inputRange__track inputRange__track--background"
                      }}
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
                  </InputStyles>
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
