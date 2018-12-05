import React from "react";

import { TextField } from "../components/shared/globalField";

const Login = () => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Entra a Te vi EPE</h3>
          <div className="box animated bounceInLeft">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="login" />
            </figure>

            <TextField
              type="email"
              name="email"
              placeholder="Correo electrónico"
              isRequired
            />
            <TextField
              type="password"
              name="password"
              placeholder="Contraseña"
              isRequired
            />
            <button
              type="submit"
              className="button is-block is-primary is-large is-fullwidth"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
