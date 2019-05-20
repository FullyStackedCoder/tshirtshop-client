import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Title, ProductStyles, PriceTag, OldPriceTag, TestButton } from "./styles";
import { formatMoney, pickPrice, oldPrice } from "../../lib/formatMoney";
import { endpointImages } from "../../config";
import Button from '../Button/styles';
import { buildSchemaFromTypeDefinitions } from "graphql-tools";

const Product = props => {
  const { product } = props;
  return (
    <Link
      href={{
        pathname: "/product",
        query: { id: product.product_id }
      }}
    >
      <ProductStyles>
        {product.image && (
          <img src={`${endpointImages}${product.image}`} alt={product.name} />
        )}
        <Title>
          {product.name}
        </Title>
        <PriceTag>
          {pickPrice(product.price, product.discounted_price)}
        </PriceTag>
        <OldPriceTag>
          <s>{oldPrice(product.price, product.discounted_price)}</s>
        </OldPriceTag>
        <button>View Product</button>
      </ProductStyles>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
