import React, { PureComponent } from "react";
import { gql } from "apollo-boost";
import { Mutation, withApollo } from "react-apollo";
import Router from "next/router";

const logout = gql`
  mutation Logout {
    logout
  }
`;

class isLoggedIn extends PureComponent {
  state = {
    clicked: false
  };

  redirect = () => {
    const { me } = this.props;
    this.openMenu();
    Router.push(`/profile/edit/${me.id}`);
  };

  openMenu = () => {
    const { clicked } = this.state;

    this.setState({ clicked: !clicked });
  };

  render() {
    const { me, client } = this.props;
    const { clicked } = this.state;

    return (
      <Mutation
        mutation={logout}
        onCompleted={() => {
          client.cache.reset().then(() => {
            Router.push("/");
          });
        }}
      >
        {mutate => (
          <div
            className={`navbar-item has-dropdown ${clicked ? "is-active" : ""}`}
            onClick={this.openMenu}
          >
            <a className="navbar-link">
              {me.name} {me.lastname}
            </a>

            <div className="navbar-dropdown is-right">
              <a className="navbar-item" onClick={() => this.redirect()}>
                <span className="icon">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span>Configuración de usuario</span>
              </a>

              <a className="navbar-item" onClick={() => mutate()}>
                <span className="icon">
                  <i className="fas fa-sign-out-alt" aria-hidden="true" />
                </span>
                <span>Salir</span>
              </a>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withApollo(isLoggedIn);
