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
        <p className="animated pulse" id="title">
          Tejidos virtuales para el emprendimiento, las prácticas profesionales
          y la empleabilidad
        </p>
        <div
          className="field has-addons animated pulse"
          style={{ padding: "2em" }}
        >
          <div className="control is-expanded">
            <input
              className={`input is-hovered ${width < 600 ? "" : "is-medium"}`}
              type="search"
              placeholder="Busca lo que tú necesitas"
            />
          </div>
          <div className="control">
            <a
              className={`button is-primary ${width < 600 ? "" : "is-medium"}`}
            >
              Buscar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default background;
