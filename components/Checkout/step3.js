import React from "react";
import { Query } from "react-apollo";
import Router from "next/router";
import styled from "styled-components";
import Button from "../Button/styles";
import { ALL_CART_ITEMS_QUERY } from "../Cart";
import { endpointImages } from "../../config";
import { formatMoney, pickPrice } from "../../lib/formatMoney";
import calcTotalPrice from "../../lib/calcTotalCartPrice";
import { ConfirmationStyles, CartItemsList, CartItemStyles } from './styles';

const routeToCart = () => {
  Router.push({
    pathname: "/cart"
  });
};

const getEstimatedTotal = (data, props) => {
  let shippingCost = 0;

  let cartTotal =
    data &&
    data.data.cartItems &&
    calcTotalPrice(data.data.cartItems);

  props.shippingTypes.shippings.map(shipping => {
    if (shipping.shipping_id === props.values.shippingType) {
      shippingCost = shipping.shipping_cost;
    }
  });
  return formatMoney(cartTotal + shippingCost);
};

const Step3 = props => {
  return (
    <Query
      query={ALL_CART_ITEMS_QUERY}
      variables={{ cartId: props.values.cartId }}
    >
      {(data, error, loading) => {
        if (loading) return null;
        return (
          <>
            <ConfirmationStyles>
              <div className="delivery">
                <p className="headings">Delivery Information:</p>
                <p>
                  <span>Full Name:</span>{" "}
                  {`${props.values.firstName} ${props.values.lastName}`}
                </p>
                <p>
                  <span>Address:</span> {props.values.address}
                </p>
                <p>
                  <span>City:</span> {props.values.city}
                </p>
                <p>
                  <span>State:</span> {props.values.state}
                </p>
                <p>
                  <span>Country:</span> {props.values.country}
                </p>
                <p>
                  <span>Zip Code:</span> {props.values.zipcode}
                </p>
                <p>
                  <span>Shipping Region:</span>{" "}
                  {props.shippingRegions.shippingRegions.map(shippingRegion => {
                    if (
                      parseInt(shippingRegion.shipping_region_id) ===
                      props.values.shipping
                    ) {
                      return shippingRegion.shipping_region;
                    }
                  })}
                </p>
                <p>
                  <span>Shipping Type:</span>{" "}
                  {props.shippingTypes.shippings.map(shipping => {
                    if (shipping.shipping_id === props.values.shippingType) {
                      return shipping.shipping_type;
                    }
                  })}
                </p>
                <Button
                  style={{ marginTop: "2rem" }}
                  onClick={() => props.saveAndContinue("showStep2")}
                >
                  Change Delivery Information
                </Button>
              </div>

              <div className="checkout">
                <div className="checkoutSummary">
                  <div className="totalCost">
                    <p>Total Items Cost:</p>
                    <p>
                      {data &&
                        data.data.cartItems &&
                        formatMoney(calcTotalPrice(data.data.cartItems))}
                    </p>
                  </div>
                  <div className="totalCost">
                    <p>Shipping Cost:</p>
                    <p>
                      {props.shippingTypes.shippings.map(shipping => {
                        if (
                          shipping.shipping_id === props.values.shippingType
                        ) {
                          return formatMoney(shipping.shipping_cost);
                        }
                      })}
                    </p>
                  </div>
                  <div className="breakline" />
                  <div className="totalCost">
                    <p>Estimated Total:</p>
                    <p>{getEstimatedTotal(data, props)}</p>
                  </div>
                  <Button
                    style={{ marginTop: "2rem" }}
                    onClick={() => props.saveAndContinue("showStep3")}
                  >
                    Confirm and Proceed to Pay
                  </Button>
                </div>
              </div>
            </ConfirmationStyles>
            <ConfirmationStyles>
              <div className="cart">
                <p className="headings">Items in your cart:</p>
                <CartItemsList>
                  {data &&
                    data.data.cartItems &&
                    data.data.cartItems.map(cartItem => {
                      return (
                        <CartItemStyles key={cartItem.product.product_id}>
                          <img
                            src={`${endpointImages}${cartItem.product.image}`}
                            alt={cartItem.product.name}
                          />
                          <div className="details">
                            <h3 className="headingTertiary">
                              {cartItem.product.name}
                            </h3>
                            <p>
                              {pickPrice(
                                cartItem.product.price,
                                cartItem.product.discounted_price
                              )}{" "}
                              x {cartItem.quantity}
                            </p>
                          </div>
                        </CartItemStyles>
                      );
                    })}
                </CartItemsList>
                <Button style={{ marginTop: "2rem" }} onClick={routeToCart}>
                  View Cart
                </Button>
              </div>
            </ConfirmationStyles>
          </>
        );
      }}
    </Query>
  );
};

export default Step3;
