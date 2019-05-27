import React, { Component } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import NProgress from "nprogress";
import debounce from "lodash.debounce";
import { StyledSearch } from "./styles";
import Icon from "../Icon";
import { ICONS } from "../../lib/globalIcons";
import { LOCAL_STATE_QUERY } from "../Products";

const UPDATE_LOCAL_SEARCH_TERM_MUTATION = gql`
  mutation UPDATE_LOCAL_SEARCH_TERM_MUTATION($searchTerm: String) {
    updateLocalSearchTermMutation(searchTerm: $searchTerm) @client
  }
`;

class NewSearch extends Component {
  state = {
    loading: false,
    searchTerm: ""
  };

  searchInput = React.createRef();

  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true, searchTerm: e.target.value });

    NProgress.start();
    try {
      Router.push({
        pathname: "/products"
      });
      const res = await client.mutate({
        mutation: UPDATE_LOCAL_SEARCH_TERM_MUTATION,
        variables: { searchTerm: e.target.value }
      });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
    this.setState({
      loading: false
    });
  }, 350);

  onClick = async (e, client) => {
    this.searchInput.current.value = "";
    // turn loading on
    this.setState({ loading: true });

    NProgress.start();
    try {
      Router.push({
        pathname: "/products"
      });
      const res = await client.mutate({
        mutation: UPDATE_LOCAL_SEARCH_TERM_MUTATION,
        variables: { searchTerm: "" }
      });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
    this.setState({
      loading: false,
      searchTerm: ""
    });
  };

  render() {
    return (
      <Query query={LOCAL_STATE_QUERY}>
        {(data, error, loading) => {
          return (
            <StyledSearch>
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
                    <>
                      <input
                        type="text"
                        ref={this.searchInput}
                        className={this.state.loading ? "loading" : ""}
                        placeholder="Search our store"
                        id="search"
                        onChange={e => {
                          e.persist();
                          this.onChange(e, client);
                        }}
                      />
                      <div
                        className="clearSearch"
                        onClick={e => this.onClick(e, client)}
                      >
                        <Icon
                          icon={ICONS.SEARCHCLOSE}
                          size={14}
                          color="rgba(0,0,0,0.54)"
                        />
                      </div>
                    </>
                  )}
                </ApolloConsumer>
              </div>
            </StyledSearch>
          );
        }}
      </Query>
    );
  }
}

export default NewSearch;
