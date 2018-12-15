import React, { PureComponent, Fragment } from "react";
import dynamic from "next/dynamic";

import { Consumer } from "../components/shared/contextApi";
import config from "../config.json";
import { isNotLoggedIn } from "../utils/auth";

const DynamicGeneralInformation = dynamic(
  () => import("../components/perfil/generalInformation"),
  {
    loading: () => <p>Loading...</p>
  }
);

const API = config.SERVER_API;

class Perfil extends PureComponent {
  state = {
    value: 1
  };

  handleValue = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Consumer>
        {state => {
          if (!state.response.me) {
            return <p>Loading...</p>;
          }

          return (
            <Fragment>
              <div style={{ height: 300, backgroundColor: "#00ffd9" }} />
              <div className="container is-fullhd">
                <figure
                  className="avatar-profile"
                  style={{ textAlign: "center" }}
                >
                  <img
                    style={{ width: 200 }}
                    src={`${API}/${state.response.me.routePhoto}`}
                    alt="profile"
                  />
                </figure>
                <h3 className="title" style={{ textAlign: "center" }}>
                  {state.response.me.name} {state.response.me.lastname}
                </h3>
                <div className="tabs is-medium is-centered">
                  <ul>
                    <li
                      className={`${value === 1 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(1)}
                    >
                      <a>Información general</a>
                    </li>
                    <li
                      className={`${value === 2 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(2)}
                    >
                      <a>Formación y empleo</a>
                    </li>
                    <li
                      className={`${value === 3 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(3)}
                    >
                      <a>Feedback</a>
                    </li>
                    <li
                      className={`${value === 4 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(4)}
                    >
                      <a>Mi negocio</a>
                    </li>
                    <li
                      className={`${value === 5 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(5)}
                    >
                      <a>Necesidad</a>
                    </li>
                  </ul>
                </div>
              </div>

              {value === 1 && <DynamicGeneralInformation />}
              {value === 2 && <p>Formación y empleo</p>}
              {value === 3 && <p>Feedback</p>}
              {value === 4 && <p>Mi negocio</p>}
              {value === 5 && <p>Necesidad</p>}
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

Perfil.getInitialProps = async context => isNotLoggedIn(context);

export default Perfil;
