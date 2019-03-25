import React, { useState, useEffect } from "react";

const background = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="hero-body">
      <div className="container is-widescreen has-text-centered">
        <p className="animated fadeIn" id="title">
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
              style={{ border: "none" }}
            />
          </div>
          <div className="control">
            <a className="button is-primary is-medium">
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
