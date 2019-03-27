import React from "react";

import useResize from "../../shared/useResize";

const background = () => {
  const { width } = useResize();

  return (
    <div className="hero-body">
      <div className="container is-widescreen has-text-centered">
        <p className="animated fadeIn title" id="title">
          Tejidos virtuales para el emprendimiento, las prácticas profesionales
          y la empleabilidad
        </p>
        <div
          className="field has-addons animated fadeIn"
          style={{ padding: "4em 0" }}
        >
          <div className="control is-expanded">
            <input
              className="input is-medium"
              type="search"
              placeholder="Busca lo que tú necesitas"
            />
          </div>
          <div className="control">
            <a
              className="button is-primary is-medium"
              style={{
                WebkitBoxShadow: "0 0 0 1px rgba(10, 10, 10, 0.5)",
                boxShadow: "0 0 0 1px rgba(10, 10, 10, 0.5)"
              }}
            >
              {width < 600 ? (
                <span className="icon">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
              ) : (
                "Buscar"
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default background;
