import React, { PureComponent } from "react";
import { gql } from "apollo-boost";
import { Mutation, withApollo } from "react-apollo";

import { Router } from "../../../../routes";

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
    Router.pushRoute(`/perfil/${me.id}/edit`);
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
            Router.pushRoute("/");
          });
        }}
      >
        {mutate => (
          <div
            className={`dropdown is-right ${clicked ? "is-active" : ""}`}
            style={{ paddingRight: 5 }}
          >
            <div className="dropdown-trigger">
              <button
                type="button"
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={this.openMenu}
              >
                <span className="icon is-small">
                  <i className="fas fa-user" aria-hidden="true" />
                </span>
                <span>
                  {me.name} {me.lastname}
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a className="dropdown-item" onClick={() => this.redirect()}>
                  Configuración de usuario
                </a>
                <a className="dropdown-item" onClick={() => mutate()}>
                  Salir
                </a>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withApollo(isLoggedIn);
