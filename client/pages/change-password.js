import React from "react";
import Router, { withRouter } from "next/router";
import { Form, Formik } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ForgotPasswordValidation } from "../utils/validation";
import { TextField } from "../components/shared/globalField";
import normalizeErrors from "../utils/normalizeErrors";

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

const changePassword = ({
  router: {
    query: { key }
  }
}) => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container animated bounceInLeft">
        <div className="notification is-warning">
          Si esta aquí, es porque usted desea cambiar la contraseña de su
          cuenta. Recuerde que no puede ingresar a Te vi Colombia hasta que el
          proceso de cambio de contraseña sea completado, si la llave de esta
          sección esta caducada, intente ingresando nuevamente su correo en{" "}
          <a
            style={{ fontWeight: "bold", textDecoration: "none" }}
            rel="noopener noreferrer"
            target="_blank"
            href="/password"
          >
            ¿Ha olvidado la contraseña?
          </a>
        </div>

        <Mutation mutation={forgotPasswordChangeMutation}>
          {mutate => (
            <Formik
              initialValues={{
                newPassword: ""
              }}
              validationSchema={ForgotPasswordValidation}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const { data } = await mutate({
                  variables: { newPassword: values.newPassword, key }
                });

                // if forgotPasswordChange has data, it has the errors
                if (
                  data.forgotPasswordChange &&
                  data.forgotPasswordChange.length
                ) {
                  setSubmitting(false);
                  setErrors(normalizeErrors(data.forgotPasswordChange));
                } else {
                  setSubmitting(false);
                  Router.push("/login");
                }
              }}
              render={({ isSubmitting }) => (
                <Form method="POST" style={{ padding: "0 10vw" }}>
                  <label className="label">Contraseña nueva</label>
                  <TextField
                    type="password"
                    name="newPassword"
                    placeholder="Contraseña nueva"
                    isRequired
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`button is-block is-primary is-large ${
                      isSubmitting ? "is-loading" : ""
                    }`}
                  >
                    Enviar
                  </button>
                </Form>
              )}
            />
          )}
        </Mutation>
      </div>
    </div>
  </div>
);

export default withRouter(changePassword);
