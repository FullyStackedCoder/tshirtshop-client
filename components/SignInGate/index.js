import React from "react";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import { CURRENT_USER_QUERY } from "../User";
import Button from "../Button/styles";
import { TOGGLE_USER_PANEL_MUTATION } from "../UserPanel";

const loginButtonClickHandler = async (event, client) => {
  try {
    const res = await client.mutate({
      mutation: TOGGLE_USER_PANEL_MUTATION
    });
  } catch (error) {
    console.log(error);
  }
};

const SignInGate = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <ApolloConsumer>
            {client => (
              <>
                <p>Please sign in before continuing</p>
                <Button
                  style={{ marginTop: "2rem" }}
                  onClick={event => loginButtonClickHandler(event, client)}
                >
                  Click here to Sign In
                </Button>
              </>
            )}
          </ApolloConsumer>
        );
      }
      return props.children;
    }}
  </Query>
);

export default SignInGate;
