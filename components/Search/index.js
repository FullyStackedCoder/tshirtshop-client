import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, StyledSearch } from "./styles";
import Icon from "../Icon";
import { ICONS } from "../../lib/globalIcons";
import { endpointImages, searchResultsPerQuery } from "../../config";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!, $limit: Int = ${searchResultsPerQuery}) {
    searchProducts(searchTerm: $searchTerm, limit: $limit) {
      product_id
      name
      image
    }
  }
`;

function routeToProduct(product) {
  Router.push({
    pathname: "/product",
    query: {
      id: product.product_id
    }
  });
}

class Search extends Component {
  state = {
    products: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_PRODUCTS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      products: res.data.searchProducts,
      loading: false
    });
  }, 350);
  render() {
    resetIdCounter();
    return (
      <StyledSearch>
        <Downshift
          onChange={routeToProduct}
          itemToString={item => (item === null ? "" : item.name)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div className="full-width">
              <div className="searchIcon">
                <Icon
                  icon={ICONS.SEARCHICON}
                  size={18}
                  color="rgba(0,0,0,0.54)"
                />
              </div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      className: this.state.loading ? 'loading' : '',
                      placeholder: "Search our store",
                      id: "search",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.products.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.product_id}
                      highlighted={index === highlightedIndex}
                    >
                      <img
                        width="50"
                        src={`${endpointImages}${item.image}`}
                        alt={item.name}
                      />
                      {item.name}
                    </DropDownItem>
                  ))}
                  {!this.state.products.length && !this.state.loading && (
                    <DropDownItem> Nothing Found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </StyledSearch>
    );
  }
}

export default Search;
