import React, { Fragment, PureComponent } from "react";

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

    return (
      <section id="fullpage" className="hero is-fullheight">
        <div className="hero-head">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  width="112"
                  height="28"
                  alt="logo"
                />
              </a>

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
                <a className="navbar-item">Inicio</a>
                <a className="navbar-item">Mi perfil</a>
                <a className="navbar-item">Mi negocio</a>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">
                      <strong>Crear nueva cuenta</strong>
                    </a>
                    <a className="button is-light">Entrar</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <Background />
      </section>
    );
  }
}

export default menu;
