import React, { Component } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import NProgress from "nprogress";
import styled from "styled-components";
import Form from "../Form/styles";
import Error from "../ErrorMessage";
import Shipping from "./Shipping";
import ShippingType from "./ShippingType";
import Button from "../Button/styles";
import { CURRENT_USER_QUERY } from "../User";

const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
`;

const RequiredNote = styled.p`
  font-size: 1.2rem;
  margin: 2rem 0;
`;

const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UPDATE_CUSTOMER_MUTATION(
    $customer_id: ID!
    $email: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $region: String!
    $country: String!
    $zipCode: String!
    $shippingRegion: Int!
    $shippingType: Int!
  ) {
    updateCustomer(
      customer_id: $customer_id
      email: $email
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      region: $region
      country: $country
      zipCode: $zipCode
      shippingRegion: $shippingRegion
      shippingType: $shippingType
    ) {
      customer_id
      name
      email
    }
  }
`;

class Step2 extends Component {
  state = {
    errors: null
  };

  step2SubmitHandler = async (event, client, props) => {
    event.preventDefault();
    NProgress.start();
    try {
      const res = await client.mutate({
        mutation: UPDATE_CUSTOMER_MUTATION,
        variables: {
          ...props.values,
          shippingRegion: parseInt(props.values.shipping),
          shippingType: parseInt(props.values.shippingType),
          zipCode: props.values.zipcode,
          region: props.values.state,
          customer_id: props.user.customer_id,
          email: props.user.email
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
        // onCompleted: props.saveAndContinue("showStep2")
      });
      props.saveAndContinue("showStep2");
    } catch (error) {
      console.log(error);
      this.setState({ errors: error });
    }
    NProgress.done();
  };

  render() {
    return (
      <>
        <ApolloConsumer>
          {client => {
            return (
              <Form
                method="post"
                onSubmit={event => this.step2SubmitHandler(event, client, this.props)}
              >
                <fieldset>
                  {this.state.errors && <Error error={this.state.errors} />}
                  <FormGroup>
                    <label htmlFor="firstName">
                      First Name
                      <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        onChange={this.props.changed}
                        value={this.props.values.firstName}
                      />
                    </label>
                    <label htmlFor="lastName">
                      Last Name
                      <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        onChange={this.props.changed}
                        value={this.props.values.lastName}
                      />
                    </label>
                    <label htmlFor="address">
                      Address
                      <input
                        type="text"
                        name="address"
                        placeholder="address"
                        onChange={this.props.changed}
                        value={this.props.values.address}
                      />
                    </label>
                    <label htmlFor="city">
                      City
                      <input
                        type="text"
                        name="city"
                        placeholder="city"
                        onChange={this.props.changed}
                        value={this.props.values.city}
                      />
                    </label>
                    <label htmlFor="state">
                      State
                      <input
                        type="text"
                        name="state"
                        placeholder="state"
                        onChange={this.props.changed}
                        value={this.props.values.state}
                      />
                    </label>
                    <label htmlFor="country">
                      Country
                      <input
                        type="text"
                        name="country"
                        placeholder="country"
                        onChange={this.props.changed}
                        value={this.props.values.country}
                      />
                    </label>
                    <label htmlFor="zipcode">
                      Zip Code
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="zip code"
                        onChange={this.props.changed}
                        value={this.props.values.zipcode}
                      />
                    </label>
                  </FormGroup>
                  <p>Shipping</p>
                  <FormGroup>
                    <Shipping
                      changed={this.props.changed}
                      values={this.props.values}
                      shippingRegions={this.props.shippingRegions}
                    />
                    <ShippingType
                      changed={this.props.changed}
                      values={this.props.values}
                      shippingTypes={this.props.shippingTypes}
                    />
                  </FormGroup>
                </fieldset>
                <Button type="submit">Save and Continue</Button>
              </Form>
            );
          }}
        </ApolloConsumer>
        <RequiredNote>*All fields are required to be filled out.</RequiredNote>
      </>
    );
  }
}

export default Step2;

// const Step2 = props => (
//   <>
//     <ApolloConsumer>
//       {client => {
//         return (
//           <Form method="post" onSubmit={event => step2SubmitHandler(event, client, props)}>
//             <fieldset>
//               <FormGroup>
//                 <label htmlFor="firstName">
//                   First Name
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="first name"
//                     onChange={props.changed}
//                     value={props.values.firstName}
//                   />
//                 </label>
//                 <label htmlFor="lastName">
//                   Last Name
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="last name"
//                     onChange={props.changed}
//                     value={props.values.lastName}
//                   />
//                 </label>
//                 <label htmlFor="address">
//                   Address
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="address"
//                     onChange={props.changed}
//                     value={props.values.address}
//                   />
//                 </label>
//                 <label htmlFor="city">
//                   City
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="city"
//                     onChange={props.changed}
//                     value={props.values.city}
//                   />
//                 </label>
//                 <label htmlFor="state">
//                   State
//                   <input
//                     type="text"
//                     name="state"
//                     placeholder="state"
//                     onChange={props.changed}
//                     value={props.values.state}
//                   />
//                 </label>
//                 <label htmlFor="country">
//                   Country
//                   <input
//                     type="text"
//                     name="country"
//                     placeholder="country"
//                     onChange={props.changed}
//                     value={props.values.country}
//                   />
//                 </label>
//                 <label htmlFor="zipcode">
//                   Zip Code
//                   <input
//                     type="text"
//                     name="zipcode"
//                     placeholder="zip code"
//                     onChange={props.changed}
//                     value={props.values.zipcode}
//                   />
//                 </label>
//               </FormGroup>
//               <p>Shipping</p>
//               <FormGroup>
//                 <Shipping changed={props.changed} values={props.values} shippingRegions={props.shippingRegions} />
//                 <ShippingType changed={props.changed} values={props.values} shippingTypes={props.shippingTypes} />
//               </FormGroup>
//             </fieldset>
//             <Button type='submit'>
//               Save and Continue
//             </Button>
//           </Form>
//         );
//       }}
//     </ApolloConsumer>
//     <RequiredNote>*All fields are required to be filled out.</RequiredNote>
//   </>
// );

// export default Step2;
