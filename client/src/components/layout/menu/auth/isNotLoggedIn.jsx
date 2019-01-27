import React from "react";
import Link from "next/link";

const isNotLoggedIn = ({ openMenu }) => (
  <div className="buttons" style={{ padding: "0 5px" }}>
    <a className="button is-primary">
      <Link href="/register" prefetch>
        <strong onClick={() => openMenu(false)}>Crear nueva cuenta</strong>
      </Link>
    </a>
    <Link href="/login" prefetch>
      <a className="button is-light" onClick={() => openMenu(false)}>
        Entrar
      </a>
    </Link>
  </div>
);

export default isNotLoggedIn;
