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
  redirect = e => {
    const { me, closeMenu } = this.props;
    closeMenu(e);
    Router.push(`/profile/edit/${me.id}`);
  };

  render() {
    const { me, client, clicked, menu, openMenu, closeMenu } = this.props;

    return (
      <Mutation
        mutation={logout}
        onCompleted={e => {
          client.cache.reset().then(() => {
            closeMenu(e);
            Router.push("/");
          });
        }}
      >
        {mutate => (
          <div
            className={`navbar-item has-dropdown ${clicked ? "is-active" : ""}`}
            onClick={openMenu}
            ref={menu}
          >
            <a className="navbar-link">
              {me.name} {me.lastname}
            </a>

            <div className="navbar-dropdown is-right">
              <a className="navbar-item" onClick={this.redirect}>
                <span className="icon">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span>Configuración de usuario</span>
              </a>

              <a className="navbar-item" onClick={mutate}>
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
