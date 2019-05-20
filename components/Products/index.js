import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Product from "../Product";
import Pagination from "../Pagination";
import { perPage } from "../../config";
import Departments from "../Departments";
import Categories from "../Categories";
import Skeleton from "../Skeleton";

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($offset: Int = 0, $limit: Int = ${perPage}, $departments: [Int] = [], $categories: [Int] = []) {
    products(offset: $offset, limit: $limit, departments: $departments, categories: $categories) {
      product_id
      name
      description
      price
      discounted_price
      image
      image_2
      thumbnail
      display
    }
  }
`;

const LOCAL_STATE_QUERY = gql`
  query {
    localDepartments @client
    localCategories @client {
      category_id
      name
      description
      department {
        department_id
      }
    }
    userPanelOpen @client
    localCartId @client
  }
`;

const Center = styled.div`
  text-align: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 6rem;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media only screen and (max-width: 68.75em) {
    grid-template-columns: 2fr 5fr;
    grid-gap: 4rem;
  }
  @media only screen and (max-width: 56.25em) {
    grid-template-columns: 2fr 5fr;
    grid-gap: 3rem;
  }
  @media only screen and (max-width: 41.5em) {
    grid-template-columns: 3fr 5fr;
    grid-gap: 2rem;
  }
`;

const Filters = styled.div`
  background: white;
  text-align: left;
`;

const FiltersList = styled.div`
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
  grid-gap: 3rem;
  @media only screen and (max-width: 68.75em) {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
  @media only screen and (max-width: 50.25em) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={LOCAL_STATE_QUERY}>
          {payload => (
            <>
              <Pagination
                page={this.props.page}
                departments={payload.data.localDepartments}
                categories={payload.data.localCategories.map(category =>
                  parseFloat(category.category_id)
                )}
              />
              <Container>
                <Filters>
                  <FiltersList>
                    <Departments departments={payload.data.localDepartments} />

                    <Categories
                      departments={payload.data.localDepartments}
                      categories={payload.data.localCategories}
                    />
                  </FiltersList>
                </Filters>
                <Query
                  query={ALL_PRODUCTS_QUERY}
                  variables={{
                    offset: this.props.page * perPage - perPage,
                    departments: payload.data.localDepartments,
                    categories: payload.data.localCategories.map(category =>
                      parseFloat(category.category_id)
                    )
                  }}
                >
                  {({ data, error, loading }) => {
                    if (loading) {
                      return (
                        <ProductsList>
                          {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} />
                          ))}
                        </ProductsList>
                      );
                    }
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                      <ProductsList>
                        {data.products.map(product => (
                          <Product product={product} key={product.product_id} />
                        ))}
                      </ProductsList>
                    );
                  }}
                </Query>
              </Container>
              <Pagination
                page={this.props.page}
                departments={payload.data.localDepartments}
              />
            </>
          )}
        </Query>
      </Center>
    );
  }
}

export default Items;
export { LOCAL_STATE_QUERY, ALL_PRODUCTS_QUERY };
