import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

const ShippingType = props => (
  <label htmlFor="shippingType">
    Type
    <select
      name="shippingType"
      value={props.values.shippingType}
      onChange={props.changed}
      disabled={props.values.shipping === 1}
    >
      <option value="0">Please select</option>
      {props.shippingTypes.shippings.map(shipping =>
        shipping.shipping_region_id === `${props.values.shipping}` ? (
          <option key={shipping.shipping_id} value={shipping.shipping_id}>
            {shipping.shipping_type}
          </option>
        ) : null
      )}
    </select>
  </label>
);

export default ShippingType;
