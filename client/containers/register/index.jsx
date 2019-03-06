import React, { useState } from "react";

const registerContainer = ({
  registered,
  errorRegistered,
  setFieldValue,
  children
}) => {
  const [light, setLight] = useState(true);

  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="hero-body">
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

          {errorRegistered && (
            <div
              id="registered"
              className="animated bounceIn notification is-danger"
            >
              <button
                type="button"
                className="delete"
                onClick={() => setFieldValue("errorRegistered", false, false)}
              />
              <p className="subtitle">
                Se han encontrado errores, por favor revise nuevamente el
                formulario.
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
                    light
                      ? "/static/img/lightOn.svg"
                      : "/static/img/lightOff.svg"
                  }
                  onClick={() => setLight(!light)}
                  alt="login"
                />
              </figure>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerContainer;
