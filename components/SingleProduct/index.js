import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Error from "../ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import { endpointImages } from "../../config";
import Attributes from "../Attributes";
import QuantitySelectorStyles from "../QualitySelector/styles";
import Icon from "../Icon";
import { ICONS } from "../../lib/globalIcons";
import { formatMoney, pickPrice, oldPrice } from "../../lib/formatMoney";
import AddToCart from "../AddToCart";

const SingleProductStyles = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 2fr 3fr;
  grid-auto-flow: column;
  min-height: 60rem;
  .imageGallery {
    max-width: 100%;
    margin: 3rem;
    @media only screen and (max-width: 56.25em) {
      max-width: 70%;
      margin: 0 auto;
    }
    @media only screen and (max-width: 31.25em) {
      max-width: 100%;
      margin: 0 auto;
    }
    img {
      width: 50%;
      display: block;
      margin: 0 auto;
      object-fit: contain;
    }
    .breakline {
      width: 100%;
      margin-top: 1rem;
      height: 0.2rem;
      background-color: #e1e1e1;
    }
    .thumbnails {
      max-width: 100%;
      margin: 0.5rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      img {
        width: 25%;
        margin: 0.5rem;
        object-fit: contain;
      }
    }
  }
  .details {
    margin: 2rem;
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 68.75em) {
    grid-auto-columns: 1fr 1fr;
    grid-auto-flow: column;
  }
  @media only screen and (max-width: 56.25em) {
    grid-auto-row: 1fr;
    grid-auto-flow: row;
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(id: $id) {
      product_id
      name
      description
      price
      discounted_price
      image
      image_2
      attributes {
        attribute_value_id
        value
        attribute {
          name
          attribute_id
        }
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $attributes: String!
    $quantity: Int!
    $productId: ID!
  ) {
    addToCart(
      attributes: $attributes
      quantity: $quantity
      productId: $productId
    ) {
      cart_id
    }
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

class SingleProduct extends Component {
  state = {
    thumbnail: "",
    attributes: { Size: "S", Color: "White" },
    quantity: 1
  };

  thumbnailImages = item => {
    const thumbnailArray = [];
    Object.entries(item).forEach(([key, value]) => {
      if (key.includes("image")) {
        thumbnailArray.push(value);
      }
    });
    return thumbnailArray;
  };

  setGalleryMainImage = thumbnail => {
    this.setState({ thumbnail: thumbnail });
  };

  attributeClickHandler = (attributeName, attValue) => {
    const updatedAttributes = {
      ...this.state.attributes,
      [attributeName]: attValue
    };
    this.setState({ attributes: updatedAttributes });
  };

  setQuantityHandler = targetName => {
    if (targetName === "decrease" && this.state.quantity > 1) {
      this.setState(prevState => {
        return { quantity: prevState.quantity - 1 };
      });
    }
    if (targetName === "increase") {
      this.setState(prevState => {
        return { quantity: prevState.quantity + 1 };
      });
    }
  };

  render() {
    return (
      <Query
        query={SINGLE_PRODUCT_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.product) return <p>No Item Found for {this.props.id}</p>;
          const product = data.product;
          return (
            <SingleProductStyles>
              <Head>
                <title>TShirt Shop | {product.name}</title>
              </Head>
              <div className="imageGallery">
                <img
                  src={`${endpointImages}${
                    this.state.thumbnail ? this.state.thumbnail : product.image
                  }`}
                  alt={product.name}
                />
                <div className="breakline" />
                {/* <div className="thumbnails">
                  {this.thumbnailImages(product).map(thumbnail => (
                    <img
                      key={thumbnail}
                      src={`${endpointImages}${thumbnail}`}
                      alt={product.name}
                      onClick={() => this.setGalleryMainImage(thumbnail)}
                    />
                  ))}
                </div> */}
              </div>
              <div className="details">
                <h2 className="heading-secondary">{product.name}</h2>
                <p>
                  <s>{oldPrice(product.price, product.discounted_price)}</s>{" "}
                  {pickPrice(product.price, product.discounted_price)}
                </p>
                <p>{product.description}</p>
                <Attributes
                  product={product}
                  clickHandler={this.attributeClickHandler}
                  attributes={this.state.attributes}
                />
                <p>
                  {this.state.attributes.Size &&
                    `Selected Size: ${this.state.attributes.Size}`}
                </p>
                <p>
                  {this.state.attributes.Color &&
                    `Selected Color: ${this.state.attributes.Color}`}
                </p>
                <QuantitySelectorStyles>
                  <h3>Quantity:</h3>
                  <div
                    className="selectors"
                    name="decrease"
                    onClick={() => this.setQuantityHandler("decrease")}
                  >
                    <Icon
                      icon={ICONS.CHEVRONDOWN}
                      size={24}
                      color="rgba(0,0,0,0.74)"
                    />
                  </div>
                  <p>{this.state.quantity}</p>
                  <div
                    className="selectors"
                    name="increase"
                    onClick={() => this.setQuantityHandler("increase")}
                  >
                    <Icon
                      icon={ICONS.CHEVRONUP}
                      size={24}
                      color="rgba(0,0,0,0.74)"
                    />
                  </div>
                </QuantitySelectorStyles>
                <AddToCart
                  attributes={this.state.attributes}
                  quantity={this.state.quantity}
                  productId={product.product_id}
                />
              </div>
            </SingleProductStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleProduct;
export { SINGLE_PRODUCT_QUERY, ALL_ATTRIBUTES_QUERY };
