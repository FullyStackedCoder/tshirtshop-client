import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_SHIPPING_REGIONS_QUERY = gql`
  query ALL_SHIPPING_REGIONS_QUERY {
    shippingRegions {
      shipping_region_id
      shipping_region
    }
  }
`;

const Shipping = props => (
  <label htmlFor="shipping">
    Region
    <select
      name="shipping"
      value={props.values.shipping}
      onChange={props.changed}
    >
      {props.shippingRegions.shippingRegions.map(shippingRegion => (
        <option
          key={shippingRegion.shipping_region_id}
          value={shippingRegion.shipping_region_id}
        >
          {shippingRegion.shipping_region}
        </option>
      ))}
    </select>
  </label>
);

export default Shipping;
