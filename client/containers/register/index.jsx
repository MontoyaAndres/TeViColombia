import React, { useState } from "react";

const registerContainer = ({ registered, setFieldValue, children }) => {
  const [light, setLight] = useState(true);

  return (
    <div className="container has-text-centered">
      {/* Created successfully */}
      {registered && (
        <div
          id="registered"
          className="animated bounceIn notification is-primary"
        >
          <button
            type="button"
            className="delete"
            onClick={() => setFieldValue("registered", false, false)}
          />
          <p className="subtitle">
            Por favor revise su correo electrónico para poder entrar a Te vi
            Colombia.
          </p>
        </div>
      )}

      <div className="column is-6 is-offset-3">
        <h3 className="title has-text-grey">Crea una nueva cuenta</h3>
        <div className="box animated bounceInLeft">
          <figure className="avatar">
            <img
              className="logo"
              src={
                light ? "/static/img/lightOn.svg" : "/static/img/lightOff.svg"
              }
              onClick={() => setLight(!light)}
              alt="login"
            />
          </figure>
          {children}
        </div>
      </div>
    </div>
  );
};

export default registerContainer;
