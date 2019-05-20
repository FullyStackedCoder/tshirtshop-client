import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";
import Router from "next/router";
import NProgress from 'nprogress';
import CheckBoxStyles from '../Checkbox/styles';

const ALL_DEPARTMENTS_QUERY = gql`
  query ALL_DEPARTMENTS_QUERY {
    departments {
      department_id
      name
      description
    }
  }
`;

const UPDATE_DEPARTMENTS_MUTATION = gql`
  mutation ($checkboxValue: String, $checkboxChecked: Boolean) {
    updateDepartments(checkboxValue: $checkboxValue, checkboxChecked: $checkboxChecked) @client
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

class Departments extends Component {
  onChangeHandler = async (e, client) => {
    NProgress.start();
    try {
      Router.push({
        pathname: '/products',
      })
      const res = await client.mutate({
        mutation: UPDATE_DEPARTMENTS_MUTATION,
        variables: { checkboxValue: e.target.value, checkboxChecked: e.target.checked}
      });
    } catch(error) {
      console.log(error)
    }
    NProgress.done();
  }

  render() {
    return (
      <Query query={ALL_DEPARTMENTS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <SidebarStyles>
              <div className="heading">Departments</div>
              {data.departments.map(department => (
                <CheckBoxStyles key={department.department_id}>
                  <div className="CheckBoxGroup">
                    <ApolloConsumer>
                      {client => (
                        <input
                          type="checkbox"
                          className="CheckBoxInput"
                          id={department.department_id}
                          name={department.name}
                          value={department.department_id}
                          onChange={e => this.onChangeHandler(e, client)}
                          checked={
                            this.props.departments.includes(parseFloat(department.department_id))
                          }
                        />
                      )}
                    </ApolloConsumer>
                    <label
                      htmlFor={department.department_id}
                      className="CheckBoxLabel"
                    >
                      <span className="CheckBoxButton" />
                      {department.name}
                    </label>
                  </div>
                </CheckBoxStyles>
              ))}
            </SidebarStyles>
          );
        }}
      </Query>
    );
  }
}

export default Departments;