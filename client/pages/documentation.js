import React from "react";

const documentation = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Documentación de Te Vi Colombia</h1>
      <p className="subtitle">
        En este documento encontrará todo lo referente a esta aplicación.
      </p>
      <div className="box" style={{ marginTop: "0.1rem" }}>
        <iframe
          style={{ width: "100%", height: 500 }}
          src="https://docs.google.com/document/d/e/2PACX-1vR4mpfooqVipevddgGdg2OLXaFztYJCBYIJyZcq7QjYRDXKx2Cw9wDacmx-jeisuiunU27aQXJBwyhE/pub?embedded=true"
        />
      </div>
    </div>
  </section>
);

export default documentation;
