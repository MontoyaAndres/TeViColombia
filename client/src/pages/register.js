import React from "react";

import { TextField, SelectField } from "../components/shared/globalField";

const Register = () => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Crea una nueva cuenta</h3>
          <div className="box animated bounceInLeft">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="login" />
            </figure>

            <TextField
              type="text"
              name="name"
              placeholder="Nombre"
              isRequired
            />
            <TextField
              type="text"
              name="lastname"
              placeholder="Apellido"
              isRequired
            />
            <TextField
              type="tel"
              name="telephone"
              placeholder="Teléfono celular"
              isRequired
            />
            <SelectField
              name="typeDocument"
              arrayPlaceholder={[
                "Tarjeta de identidad",
                "Cédula de ciudadania"
              ]}
              isRequired
            />
            <TextField
              type="number"
              name="document"
              placeholder="Número de documento"
              isRequired
            />
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

            <label className="checkbox" style={{ padding: "0.5em 0" }}>
              <input type="checkbox" required /> He leido los{" "}
              <a href="#">terminos y condiciones</a>
            </label>
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

export default Register;
