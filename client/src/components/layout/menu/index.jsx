import React, { PureComponent } from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import Background from "./background";

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
      router: { pathname }
    } = this.props;

    return (
      <section
        id={pathname === "/" ? "fullpage" : ""}
        className={pathname === "/" ? "hero is-fullheight" : ""}
      >
        <div className="hero-head">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link prefetch href="/">
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
              className={`animated fadeIn navbar-menu ${
                clicked ? "is-active" : ""
              }`}
            >
              <div className="navbar-start">
                <Link prefetch href="/">
                  <a className="navbar-item">Inicio</a>
                </Link>
                <Link prefetch href="/mi-perfil">
                  <a className="navbar-item">Mi perfil</a>
                </Link>
                <Link prefetch href="/mi-negocio">
                  <a className="navbar-item">Mi negocio</a>
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">
                      <Link prefetch href="/register">
                        <strong>Crear nueva cuenta</strong>
                      </Link>
                    </a>
                    <Link prefetch href="/login">
                      <a className="button is-light">Entrar</a>
                    </Link>
                  </div>
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

export default withRouter(menu);
