import React from "react";
import Link from "next/link";

const isNotLoggedIn = ({ closeMenu }) => (
  <div className="buttons" style={{ padding: "0 5px" }}>
    <a className="button is-primary">
      <Link href="/register">
        <strong onClick={closeMenu}>Crear nueva cuenta</strong>
      </Link>
    </a>
    <Link href="/login">
      <a className="button is-light" onClick={closeMenu}>
        Entrar
      </a>
    </Link>
  </div>
);

export default isNotLoggedIn;
