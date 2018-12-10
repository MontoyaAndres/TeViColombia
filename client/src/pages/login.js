import React from "react";
import Router from "next/router";
import { Formik, Form } from "formik";

import { TextField } from "../components/shared/globalField";
import { LoginValidation } from "../utils/validation";
import { login } from "../api/auth";
import { Consumer } from "../components/shared/contextApi";
import normalizeErrors from "../utils/normalizeErrors";

const Login = () => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Entra a Te vi EPE</h3>
          <div className="box animated bounceInLeft">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="login" />
            </figure>

            <Consumer>
              {state => (
                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  validationSchema={LoginValidation}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response = await login(values);
                    const { ok, errors } = response;
                    if (ok) {
                      setSubmitting(false);
                      // Getting current user
                      await state.actions.getMeUser();
                      Router.push("/");
                    } else {
                      setSubmitting(false);
                      setErrors(normalizeErrors(errors));
                    }
                  }}
                  render={({ isSubmitting }) => (
                    <Form method="POST">
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

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`button is-block is-primary is-large is-fullwidth ${
                          isSubmitting ? "is-loading" : ""
                        }`}
                      >
                        Entrar
                      </button>
                    </Form>
                  )}
                />
              )}
            </Consumer>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
