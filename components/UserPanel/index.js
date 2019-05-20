import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Router from 'next/router';
import UserPanelStyles, { CloseButton } from "./styles";
import Signup from "../Signup";
import Signin from "../Signin";
import Signout from "../Signout";
import User from "../User";
import Button from '../Button/styles';

const LOCAL_STATE_QUERY = gql`
  query {
    userPanelOpen @client
  }
`;

const TOGGLE_USER_PANEL_MUTATION = gql`
  mutation {
    toggleUserPanel @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleUserPanel: ({ render }) => (
    <Mutation mutation={TOGGLE_USER_PANEL_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

class UserPanel extends Component {
  state = {
    isSignin: true,
    isRegister: false
  };

  signinClickHandler = event => {
    this.setState(prevState => {
      return {
        isSignin: true,
        isRegister: false
      };
    });
  };

  registerClickHandler = event => {
    this.setState(prevState => {
      return {
        isSignin: false,
        isRegister: true
      };
    });
  };

  ordersClickedHandler = event => {
    Router.push({
      pathname: '/orders'
    })
  }

  renderContent = (me, toggleUserPanel, localState, renderForm) => {
    if (!me) {
      return (
        <UserPanelStyles open={localState.data.userPanelOpen}>
          <header>
            <CloseButton title="close" onClick={toggleUserPanel}>
              &times;
            </CloseButton>
            <h3 className="heading-tertiary">Your account</h3>
          </header>
          <content>
            <p>
              Please Signin to your account or register for a new account if you
              have not registered yet to manage your account settings.
            </p>
            <div className="userAccountButtons">
              <p
                className="heading-tertiary"
                aria-selected={this.state.isSignin}
                onClick={this.signinClickHandler}
              >
                Singin
              </p>
              <p
                className="heading-tertiary"
                aria-selected={this.state.isRegister}
                onClick={this.registerClickHandler}
              >
                Register
              </p>
            </div>
            {renderForm}
          </content>
        </UserPanelStyles>
      );
    }
    return (
      <UserPanelStyles open={localState.data.userPanelOpen}>
        <header>
          <CloseButton title="close" onClick={toggleUserPanel}>
            &times;
          </CloseButton>
          <h3 className="heading-tertiary">Your account</h3>
        </header>
        <content>
          <p>Hello {me.name}</p>
          <Button style={{ margin: "2rem 0" }} onClick={this.ordersClickedHandler}>View Orders</Button>
          <Signout />
        </content>
      </UserPanelStyles>
    );
  };

  render() {
    const renderForm = this.state.isRegister ? <Signup /> : <Signin />;
    return (
      <Composed>
        {({ user, toggleUserPanel, localState }) => {
          const me = user.data.me;
          return this.renderContent(me, toggleUserPanel, localState, renderForm);
        }}
      </Composed>
    );
  }
}

export default UserPanel;
export { LOCAL_STATE_QUERY, TOGGLE_USER_PANEL_MUTATION };
