import React, { Component } from "react";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import NProgress from "nprogress";
import styled from "styled-components";

const AttributeValuesStyles = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const SingleAttributeColorStyles = styled.div`
  position: relative;
  margin: 1rem 1rem 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.22);
  background-color: rgba(0, 0, 0, 0.08);
  height: 50px;
  min-height: 50px;
  width: 50px;
  min-width: 50px;
  border-radius: 4px;
  cursor: pointer;
  ${props =>
    props.touched &&
    `border: 2px solid rgba(0, 0, 0, 0.75); background-color: rgba(0, 0, 0, 0.30);`}
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.22);
    background-color: rgba(0, 0, 0, 0.22);
    ${props => props.touched && `border: 2px solid rgba(0, 0, 0, 0.75);`}
  }
  &:last-child {
    margin: 1rem 0;
  }
`;

const SingleAttributeColorLabelStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
`;

const SingleAttributeColor = styled.div`
  height: 100%;
  background-color: ${props => props.bgColor};
`;

const SingleAttributeSizeStyles = styled.div`
  font-size: 2rem;
  position: relative;
  margin: 1rem 1rem 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.22);
  background-color: rgba(0, 0, 0, 0.08);
  height: 40px;
  min-height: 40px;
  width: 60px;
  min-width: 60px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  ${props =>
    props.touched &&
    `
    background-color: #0590c7;
    color: white;
  `};
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.22);
    background-color: rgba(0, 0, 0, 0.22);
    ${props =>
      props.touched &&
      `
    background-color: #0590c7;
    color: white;
  `};
  }
  &:last-child {
    margin: 1rem 0;
  }
`;

const SidebarStyles = styled.div`
  .heading {
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
  }
`;

const ALL_ATTRIBUTES_QUERY = gql`
  query ALL_ATTRIBUTES_QUERY {
    attributes {
      attribute_id
      name
      attributeValue {
        value
        attribute_value_id
        attribute {
          name
          attribute_id
        }
      }
    }
  }
`;

const UPDATE_LOCAL_ATTRIBUTES_MUTATION = gql`
  mutation UPDATE_LOCAL_ATTRIBUTES_MUTATION($attribute: String!) {
    updateLocalAttributes(attribute: $attribute) @client
  }
`;

class FilterAttributes extends Component {
  state = {
    selectedAttributes: []
  };

  attributeClickHandler = async (attribute, att, client) => {
    let updatedAttributes = [...this.state.selectedAttributes];
    if (updatedAttributes.indexOf(att.value) !== -1) {
      updatedAttributes = updatedAttributes.filter(
        attribute => attribute !== att.value
      );
    } else {
      updatedAttributes.push(att.value);
    }
    this.setState({ selectedAttributes: updatedAttributes });
    NProgress.start();
    try {
      Router.push({
        pathname: "/products"
      });
      const res = await client.mutate({
        mutation: UPDATE_LOCAL_ATTRIBUTES_MUTATION,
        variables: { attribute: att.value }
      });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
  };

  renderButtons = (attribute, att, client) => {
    if (attribute.attribute_id.toString() === "1") {
      return (
        <SingleAttributeSizeStyles
          key={att.attribute_value_id}
          onClick={() => this.attributeClickHandler(attribute, att, client)}
          touched={this.state.selectedAttributes.indexOf(att.value) !== -1}
        >
          {att.value}
        </SingleAttributeSizeStyles>
      );
    } else {
      return (
        <SingleAttributeColorStyles
          key={att.attribute_value_id}
          onClick={() => this.attributeClickHandler(attribute, att, client)}
          touched={this.state.selectedAttributes.indexOf(att.value) !== -1}
        >
          <SingleAttributeColorLabelStyles>
            <SingleAttributeColor bgColor={att.value} />
          </SingleAttributeColorLabelStyles>
        </SingleAttributeColorStyles>
      );
    }
  };

  render() {
    // return this.props.data.attributes.map(attribute => (
    //   <SidebarStyles key={attribute.attribute_id}>
    //     <div className="heading">{attribute.name}</div>
    //     <ApolloConsumer>
    //       {client => (
    //         <AttributeValuesStyles>
    //           {attribute.attributeValue.map(att =>
    //             attribute.attribute_id === att.attribute.attribute_id
    //               ? this.renderButtons(attribute, att, client)
    //               : ""
    //           )}
    //         </AttributeValuesStyles>
    //       )}
    //     </ApolloConsumer>
    //   </SidebarStyles>
    // ));

    return (
      <Query query={ALL_ATTRIBUTES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return data.attributes.map(attribute => (
            <SidebarStyles key={attribute.attribute_id}>
              <div className="heading">{attribute.name}</div>
              <ApolloConsumer>
                {client => (
                  <AttributeValuesStyles>
                    {attribute.attributeValue.map(att =>
                      attribute.attribute_id === att.attribute.attribute_id
                        ? this.renderButtons(attribute, att, client)
                        : ""
                    )}
                  </AttributeValuesStyles>
                )}
              </ApolloConsumer>
            </SidebarStyles>
          ));
        }}
      </Query>
    );
  }
}

export default FilterAttributes;
