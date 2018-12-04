import React from "react";

const background = () => (
  <div className="hero-body">
    <div className="container is-widescreen has-text-centered">
      <h2
        className="subtitle is-3 animated pulse"
        style={{ color: "white", fontWeight: "bold" }}
      >
        Tejidos virtuales para el Emprendimiento, las Prácticas profesionales y
        la Empleabilidad
      </h2>
      <div
        className="field has-addons animated pulse"
        style={{ padding: "2em" }}
      >
        <div className="control is-expanded">
          <input
            className="input is-medium is-hovered"
            type="search"
            placeholder="Busca lo que tú necesitas"
          />
        </div>
        <div className="control">
          <a className="button is-primary is-medium">Buscar</a>
        </div>
      </div>
    </div>
  </div>
);

export default background;
