import React from "react";
import Link from "next/link";

const isNotLoggedIn = () => (
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
);

export default isNotLoggedIn;
