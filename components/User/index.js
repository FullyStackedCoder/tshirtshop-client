import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      customer_id
      name
      email
      credit_card
      address_1
      address_2
      city
      region
      postal_code
      country
      shipping_region_id
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY} fetchPolicy={"cache-and-network"}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
