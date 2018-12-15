import React from "react";

import { Link } from "../../../../routes";

const isNotLoggedIn = () => (
  <div className="buttons">
    <a className="button is-primary">
      <Link route="register">
        <strong>Crear nueva cuenta</strong>
      </Link>
    </a>
    <Link route="login">
      <a className="button is-light">Entrar</a>
    </Link>
  </div>
);

export default isNotLoggedIn;
