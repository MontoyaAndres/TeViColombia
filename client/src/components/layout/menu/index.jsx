import React, { PureComponent, Fragment } from "react";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";

import { Link } from "../../../routes";
import Background from "./background";
import IsLoggedIn from "./auth/isLoggedIn";
import IsNotLoggedIn from "./auth/isNotLoggedIn";
import meQuery from "../../../graphql/queries/me";

// TODO: When the user change the page, close menu.

class menu extends PureComponent {
  state = {
    clicked: false
  };

  openMenu = () => {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  };

  render() {
    const { clicked } = this.state;
    const {
      router: { pathname },
      data: { me }
    } = this.props;

    return (
      <section
        id={pathname === "/" ? "fullpage" : ""}
        className={pathname === "/" ? "hero is-fullheight" : ""}
      >
        <div className="animated fadeIn hero-head">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link route="/">
                <a className="navbar-item">
                  <img
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112"
                    height="28"
                    alt="logo"
                  />
                </a>
              </Link>

              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarButton"
                onClick={this.openMenu}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div
              id="navbarButton"
              className={`navbar-menu ${clicked ? "is-active" : ""}`}
            >
              <div className="navbar-start">
                <Link route="/">
                  <a className="navbar-item">Inicio</a>
                </Link>
                {me && (
                  <Fragment>
                    <Link route="perfil" params={{ id: me.id }}>
                      <a className="navbar-item">Mi perfil</a>
                    </Link>
                    <Link route="mi-negocio">
                      <a className="navbar-item">Mi negocio</a>
                    </Link>
                  </Fragment>
                )}
                <Link route="documentation">
                  <a className="navbar-item">Documentación</a>
                </Link>
                <Link route="about">
                  <a className="navbar-item">Acerca de nosotros</a>
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  {me ? <IsLoggedIn me={me} /> : <IsNotLoggedIn />}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {pathname === "/" && <Background />}
      </section>
    );
  }
}

export default graphql(meQuery)(withRouter(menu));
