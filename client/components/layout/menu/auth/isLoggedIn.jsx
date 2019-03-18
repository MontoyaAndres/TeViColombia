import React from "react";
import gql from "graphql-tag";
import { Mutation, withApollo } from "react-apollo";
import Router from "next/router";

const logout = gql`
  mutation Logout {
    logout
  }
`;

const isLoggedIn = ({ me, client, clicked, menu, openMenu, closeMenu }) => {
  function redirectToPersonalize(e) {
    closeMenu(e);
    if (me.type === "User") {
      Router.push(`/profile/user/edit/${me.id}`);
    } else if (me.type === "Business") {
      Router.push(`/profile/business/edit/${me.id}`);
    }
  }

  function redirectToSettings(e) {
    closeMenu(e);
    Router.push(`/profile/settings`);
  }

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
          <a className="navbar-link" onClick={closeMenu}>
            {me.name} {me.lastname}
          </a>

          <div className="navbar-dropdown is-right">
            <a className="navbar-item" onClick={redirectToPersonalize}>
              <span className="icon">
                <i className="fas fa-user" aria-hidden="true" />
              </span>
              <span>Personalizar perfil</span>
            </a>

            <a className="navbar-item" onClick={redirectToSettings}>
              <span className="icon">
                <i className="fas fa-cog" aria-hidden="true" />
              </span>
              <span>Ajustes</span>
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
};

export default withApollo(isLoggedIn);
