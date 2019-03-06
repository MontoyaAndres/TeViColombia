import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import Link from "next/link";

import Background from "./background";
import IsLoggedIn from "./auth/isLoggedIn";
import IsNotLoggedIn from "./auth/isNotLoggedIn";
import meQuery from "../../../graphql/queries/me";

class menu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.menu = React.createRef();
  }

  openMenu = e => {
    e.preventDefault();

    if (
      this.menu.current.classList.contains("is-active") &&
      this.state.clicked
    ) {
      // Close menu when click 2 times
      this.setState({ clicked: false });
    } else {
      this.setState({ clicked: true }, () => {
        document.addEventListener("click", this.closeMenu);
      });
    }
  };

  closeMenu = () => {
    this.setState({ clicked: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
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
                <a className="navbar-item" onClick={this.closeMenu}>
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
                ref={this.menu}
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
                  <a className="navbar-item" onClick={this.closeMenu}>
                    Inicio
                  </a>
                </Link>
                {me && (
                  <>
                    <Link
                      href={{
                        pathname:
                          me.type === "User"
                            ? "/profile/user"
                            : "/profile/business",
                        query: { id: me.id }
                      }}
                      prefetch
                    >
                      <a className="navbar-item" onClick={this.closeMenu}>
                        Mi perfil
                      </a>
                    </Link>
                  </>
                )}
                <Link href="/documentation" prefetch>
                  <a className="navbar-item" onClick={this.closeMenu}>
                    Documentación
                  </a>
                </Link>
                <Link href="/about" prefetch>
                  <a className="navbar-item" onClick={this.closeMenu}>
                    Acerca de nosotros
                  </a>
                </Link>
              </div>

              <div className="navbar-end">
                {me ? (
                  <IsLoggedIn
                    me={me}
                    menu={this.menu}
                    clicked={clicked}
                    openMenu={this.openMenu}
                    closeMenu={this.closeMenu}
                  />
                ) : (
                  <IsNotLoggedIn closeMenu={this.closeMenu} />
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
