import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import AddToCart from "../AddToCart";

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

const ALL_ATTRIBUTES_QUERY = gql`
  query ALL_ATTRIBUTES_QUERY {
    attributes {
      attribute_id
      name
    }
  }
`;

class Attributes extends Component {
  state = {
    selectedAttribute: {}
  };

  componentDidMount = () => {
    this.props.attributes &&
      Object.entries(this.props.attributes).forEach(([key, value]) => {
        this.setState({ [key]: value });
      });
  };

  renderButtons = (attribute, att, props) => {
    if (attribute.attribute_id.toString() === "1") {
      return (
        <SingleAttributeSizeStyles
          key={att.attribute_value_id}
          onClick={() => this.clickHandler(attribute, att)}
          touched={att.value === this.state[attribute.name]}
        >
          {att.value}
        </SingleAttributeSizeStyles>
      );
    } else {
      return (
        <SingleAttributeColorStyles
          key={att.attribute_value_id}
          onClick={() => this.clickHandler(attribute, att)}
          touched={att.value === this.state[attribute.name]}
        >
          <SingleAttributeColorLabelStyles>
            <SingleAttributeColor bgColor={att.value} />
          </SingleAttributeColorLabelStyles>
        </SingleAttributeColorStyles>
      );
    }
  };

  clickHandler = (attribute, att) => {
    this.props.clickHandler(attribute.name, att.value);
    this.setAttribute(attribute.name, att.value);
  };

  setAttribute = (attributeName, attValue) => {
    this.setState({ [attributeName]: attValue });
  };

  render() {
    return (
      <Query query={ALL_ATTRIBUTES_QUERY}>
        {({data, error, loading}) => {
          return (
              data.attributes.map(attribute => (
              <React.Fragment key={attribute.attribute_id}>
                <h3>{attribute.name}</h3>
                <AttributeValuesStyles>
                  {this.props.product.attributes && this.props.product.attributes.map(att =>
                    attribute.attribute_id === att.attribute.attribute_id
                      ? this.renderButtons(attribute, att, this.props)
                      : ""
                  )}
                </AttributeValuesStyles>
              </React.Fragment>
              ))
          );
        }}
      </Query>
    );
  }
}

export default Attributes;
export { ALL_ATTRIBUTES_QUERY };
