import React, { PureComponent } from "react";
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

  openMenu = value => {
    const { clicked } = this.state;
    if (!value) {
      this.setState({ clicked: value });
    } else {
      this.setState({ clicked: !clicked });
    }
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
                <a className="navbar-item" onClick={() => this.openMenu(false)}>
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
                  <a
                    className="navbar-item"
                    onClick={() => this.openMenu(false)}
                  >
                    Inicio
                  </a>
                </Link>
                {me && (
                  <>
                    <Link
                      href={{ pathname: "/profile", query: { id: me.id } }}
                      prefetch
                    >
                      <a
                        className="navbar-item"
                        onClick={() => this.openMenu(false)}
                      >
                        Mi perfil
                      </a>
                    </Link>
                    <Link href="/negocio" prefetch>
                      <a
                        className="navbar-item"
                        onClick={() => this.openMenu(false)}
                      >
                        Mi negocio
                      </a>
                    </Link>
                  </>
                )}
                <Link href="/documentation" prefetch>
                  <a
                    className="navbar-item"
                    onClick={() => this.openMenu(false)}
                  >
                    Documentación
                  </a>
                </Link>
                <Link href="/about" prefetch>
                  <a
                    className="navbar-item"
                    onClick={() => this.openMenu(false)}
                  >
                    Acerca de nosotros
                  </a>
                </Link>
              </div>

              <div className="navbar-end">
                {me ? (
                  <IsLoggedIn
                    me={me}
                    openMenu={this.openMenu}
                    clicked={clicked}
                  />
                ) : (
                  <IsNotLoggedIn openMenu={this.openMenu} />
                )}
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
