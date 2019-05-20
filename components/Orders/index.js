import React, { Component } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import OrdersPageStyles, { OrderItemStyles } from "./styles";
import { formatMoney } from "../../lib/formatMoney";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    orders {
      order_id
      total_amount
      created_on
      shipped_on
      status
      orderDetail {
        order_id
        product_id
        attributes
        product_name
        quantity
        unit_cost
        product {
          name
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  @media only screen and (max-width: ${props => props.theme.bpSmallest}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const formatDateTimeFromTicks = nTicks => {
  return new Date(nTicks).toLocaleString("en-US");
};

class Orders extends Component {
  render() {
    return (
      <Query query={ALL_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return null;
          return (
            <OrdersPageStyles>
              <Head>
                <title>T-Shirt Shop - All Your Orders</title>
              </Head>
              <h2 className="heading-secondary">
                You have {orders.length} orders
              </h2>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.order_id}>
                    <Link
                      href={{
                        pathname: "/order",
                        query: { id: order.order_id }
                      }}
                    >
                      <a>
                        <p>
                          {order.orderDetail.reduce(
                            (a, b) => a + b.quantity,
                            0
                          )}{" "}
                          Items in this order.
                        </p>
                        <p>
                          Order placed on:{" "}
                          {formatDateTimeFromTicks(parseInt(order.created_on))}
                        </p>
                        <p>
                          Payment Status:{" "}
                          {order.status === "1" ? "paid" : "pending payment"}
                        </p>
                        <p>
                          Total order amount: {formatMoney(order.total_amount)}
                        </p>
                        <p>
                          Shipped on:{" "}
                          {order.shipped_on
                            ? formatDateTimeFromTicks(
                                parseInt(order.shipped_on)
                              )
                            : "not yet shipped"}
                        </p>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </OrdersPageStyles>
          );
        }}
      </Query>
    );
  }
}

export default Orders;
export { ALL_ORDERS_QUERY }
