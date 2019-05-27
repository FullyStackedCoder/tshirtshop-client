import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles, { PaginationClass } from "./styles";
import { perPage } from "../../config";
import Error from "../ErrorMessage";
import Skeleton from "../Skeleton";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($departments: [Int] = [], $categories: [Int] = [], $searchTerm: String = "", $attributeValues: [String] = [], $minPrice: Float = 0.00, $maxPrice: Float = 0.00) {
    productsCount(departments: $departments, categories: $categories, searchTerm: $searchTerm, attributeValues: $attributeValues, minPrice: $minPrice, maxPrice: $maxPrice) {
      count
    }
  }
`;

const getLinkClasses = (page, props) => {
  const class1 = page + 1 === props.page ? "active" : null;
  const class2 = "mobile";
  return `${class1} ${class2}`;
}

const Pagination = props => {
  return (
    <Query
      query={PAGINATION_QUERY}
      variables={{
        departments: props.departments,
        categories: props.categories,
        minPrice: props.minPrice,
        maxPrice: props.maxPrice,
        attributeValues: props.attributeValues,
        searchTerm: props.searchTerm
      }}
    >
      {({ data, loading, error }) => {
        if (loading)
          return (
            <PaginationStyles>
              <p>Loading...</p>
            </PaginationStyles>
          );
        if (error) return <Error error={error} />;
        const count = data.productsCount.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return (
          <PaginationClass>
            <Head>
              <title>
                TShirt Shop! — Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "products",
                query: { page: page - 1 }
              }}
            >
              <a aria-disabled={page <= 1}>← Prev</a>
            </Link>
            {[...Array(pages).keys()].map(page => {
              return (
                <Link
                  prefetch
                  href={{
                    pathname: "products",
                    query: { page: page + 1 }
                  }}
                  key={page}
                >
                  <a className={getLinkClasses(page, props)}>
                    {page + 1}
                  </a>
                </Link>
              );
            })}
            <Link
              prefetch
              href={{
                pathname: "products",
                query: { page: page + 1 }
              }}
            >
              <a aria-disabled={page >= pages}>Next →</a>
            </Link>
          </PaginationClass>
        );
      }}
    </Query>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
