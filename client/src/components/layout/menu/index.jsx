import React, { PureComponent, Fragment } from "react";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import Link from "next/link";

import Background from "./background";
import IsLoggedIn from "./auth/isLoggedIn";
import IsNotLoggedIn from "./auth/isNotLoggedIn";
import meQuery from "../../../graphql/queries/me";

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
              <Link href="/" prefetch>
                <a className="navbar-item" onClick={this.openMenu}>
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
                className={`navbar-burger ${clicked ? "is-active" : ""}`}
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
                <Link href="/" prefetch>
                  <a className="navbar-item" onClick={this.openMenu}>
                    Inicio
                  </a>
                </Link>
                {me && (
                  <Fragment>
                    <Link
                      href={{ pathname: "/profile", query: { id: me.id } }}
                      prefetch
                    >
                      <a className="navbar-item" onClick={this.openMenu}>
                        Mi perfil
                      </a>
                    </Link>
                    <Link href="/negocio" prefetch>
                      <a className="navbar-item" onClick={this.openMenu}>
                        Mi negocio
                      </a>
                    </Link>
                  </Fragment>
                )}
                <Link href="/documentation" prefetch>
                  <a className="navbar-item" onClick={this.openMenu}>
                    Documentación
                  </a>
                </Link>
                <Link href="/about" prefetch>
                  <a className="navbar-item" onClick={this.openMenu}>
                    Acerca de nosotros
                  </a>
                </Link>
              </div>

              <div className="navbar-end">
                {me ? <IsLoggedIn me={me} /> : <IsNotLoggedIn />}
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
