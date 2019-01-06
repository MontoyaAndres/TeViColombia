import React from "react";
import Link from "next/link";

const isNotLoggedIn = () => (
  <div className="buttons">
    <a className="button is-primary">
      <Link href="/register" prefetch>
        <strong>Crear nueva cuenta</strong>
      </Link>
    </a>
    <Link href="/login" prefetch>
      <a className="button is-light">Entrar</a>
    </Link>
  </div>
);

export default isNotLoggedIn;
