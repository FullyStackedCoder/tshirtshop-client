import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Head from "next/head";
import gql from "graphql-tag";
import { formatMoney } from "../../lib/formatMoney";
import Error from "../ErrorMessage";
import OrderStyles from "./styles";
import { endpointImages } from "../../config";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      order_id
      total_amount
      created_on
      shipped_on
      status
      reference
      orderDetail {
        item_id
        order_id
        product_id
        attributes
        product_name
        quantity
        unit_cost
        product {
          name
          image
        }
      }
    }
  }
`;

const formatDateTimeFromTicks = nTicks => {
  return new Date(nTicks).toLocaleString("en-US");
};

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const order = data.order;
          return (
            <OrderStyles>
              <Head>
                <title>T-Shirt Shop - Your Order Details</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Reference ID:</span>
                <span>{order.reference}</span>
              </p>
              <p>
                <span>Order Date:</span>
                <span>
                  {formatDateTimeFromTicks(parseInt(order.created_on))}
                </span>
              </p>
              <p>
                <span>Shipped on:</span>
                <span>
                  {order.shipped_on
                    ? formatDateTimeFromTicks(parseInt(order.shipped_on))
                    : "not yet shipped"}
                </span>
              </p>
              <p>
                <span>Order Total:</span>
                <span>{formatMoney(order.total_amount)}</span>
              </p>
              <p>
                <span>Product Count:</span>
                <span>{order.orderDetail.length}</span>
              </p>
              <div className="items">
                {order.orderDetail.map(orderItem => (
                  <div className="order-item" key={orderItem.item_id}>
                    <img
                      src={`${endpointImages}${orderItem.product.image}`}
                      title={orderItem.product.name}
                    />
                    <div className="item-details">
                      <h2>{orderItem.product.name}</h2>
                      <p>Qty: {orderItem.quantity}</p>
                      <p>Attributes: {orderItem.attributes}</p>
                      <p>Each: {formatMoney(orderItem.unit_cost)}</p>
                      <p>
                        SubTotal:{" "}
                        {formatMoney(orderItem.unit_cost * orderItem.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
