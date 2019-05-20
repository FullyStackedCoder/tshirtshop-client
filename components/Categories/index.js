import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import Router from "next/router";
import NProgress from 'nprogress';
import CheckBoxStyles from "../Checkbox/styles";

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES_QUERY {
    categories {
      category_id
      name
      description
      department {
        department_id
      }
    }
  }
`;

const UPDATE_CATEGORIES_MUTATION = gql`
  mutation updateCategories($checkboxValue: Int, $category: Object) {
    updateCategories(checkboxValue: $checkboxValue, category: $category) @client
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

class Categories extends Component {
  onChangeHandler = async (e, client, category) => {
    NProgress.start();
    try {
      Router.push({
        pathname: '/products',
      })
      const res = await client.mutate({
        mutation: UPDATE_CATEGORIES_MUTATION,
        variables: { checkboxValue: e.target.value, category }
      });
    } catch (error) {
      console.log(error);
    }
    NProgress.done();
  };

  checkedHandler = categoryId => {
    const checkIfExists = obj => obj.category_id === categoryId;
    return this.props.categories.some(checkIfExists);
  };

  render() {
    return (
      <Query query={ALL_CATEGORIES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            true && (
              <SidebarStyles>
                {this.props.departments.length > 0 && (
                  <div className="heading">Categories</div>
                )}
                {data.categories.map(
                  category =>
                    this.props.departments.includes(
                      parseFloat(category.department.department_id)
                    ) && (
                      <CheckBoxStyles key={category.category_id}>
                        <div className="CheckBoxGroup">
                          <ApolloConsumer>
                            {client => (
                              <input
                                type="checkbox"
                                className="CheckBoxInput"
                                id={category.name}
                                name={category.name}
                                value={category.category_id}
                                onChange={e =>
                                  this.onChangeHandler(e, client, category)
                                }
                                checked={this.checkedHandler(
                                  category.category_id
                                )}
                              />
                            )}
                          </ApolloConsumer>
                          <label
                            htmlFor={category.name}
                            className="CheckBoxLabel"
                          >
                            <span className="CheckBoxButton" />
                            {category.name}
                          </label>
                        </div>
                      </CheckBoxStyles>
                    )
                )}
              </SidebarStyles>
            )
          );
        }}
      </Query>
    );
  }
}

export default Categories;
