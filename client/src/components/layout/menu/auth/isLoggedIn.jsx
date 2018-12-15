import React, { PureComponent } from "react";

import { Link, Router } from "../../../../routes";
import { logout } from "../../../../api/auth";

class isLoggedIn extends PureComponent {
  state = {
    clicked: false
  };

  openMenu = () => {
    const { clicked } = this.state;

    this.setState({ clicked: !clicked });
  };

  logoutUser = async () => {
    const { getMeUser } = this.props;
    const response = await logout();

    this.openMenu();
    if (response.ok) {
      await getMeUser();
      Router.pushRoute("/");
    }
  };

  render() {
    const { me } = this.props;
    const { clicked } = this.state;

    return (
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
            <Link route="configuration">
              <a className="dropdown-item">Configuración de usuario</a>
            </Link>
            <a href="#" className="dropdown-item" onClick={this.logoutUser}>
              Salir
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default isLoggedIn;
