import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Title,
  ProductStyles,
  PriceTag,
  OldPriceTag,
  NewProductStyles
} from "./styles";
import { formatMoney, pickPrice, oldPrice } from "../../lib/formatMoney";
import { endpointImages } from "../../config";
import Button from "../Button/styles";

const Product = props => {
  const { product } = props;
  return (
    <Link
      href={{
        pathname: "/product",
        query: { id: product.product_id }
      }}
    >
      <NewProductStyles>
        <div className="box-up">
          {product.image && (
            <img
              className="img"
              src={`${endpointImages}${product.image}`}
              alt={product.name}
            />
          )}
          <div className="heading">{product.name}</div>
          <div className="aSizes">Available Sizes: S, M, L, XL, XXL</div>
        </div>
        <div className="box-down">
          <div className="h-bg">
            <div className="h-bg-inner" />
          </div>
          <div className="priceBox">
            <div className="oldPriceTag">
              <s>{oldPrice(product.price, product.discounted_price)}</s>
            </div>
            <div className="priceTag">
              {pickPrice(product.price, product.discounted_price)}
            </div>
            <p className="viewDetails">View Details</p>
          </div>
        </div>
      </NewProductStyles>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
