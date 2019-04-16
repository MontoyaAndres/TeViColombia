import React from "react";
import Router, { withRouter } from "next/router";
import { Form, Formik } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { ForgotPasswordValidation } from "../utils/validation";
import { TextField } from "../components/shared/globalField";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import Linkify from "../components/shared/linkify";

const forgotPasswordChangeMutation = gql`
  mutation ForgotPasswordChangeMutation(
    $newPassword: String!
    $key: String!
    $type: String!
  ) {
    forgotPasswordChange(newPassword: $newPassword, key: $key, type: $type) {
      path
      message
    }
  }
`;

const changePassword = ({
  router: {
    query: { key, type }
  }
}) => (
  <div className="hero">
    <div className="hero-body">
      <div className="container animated bounceInLeft">
        <div className="notification is-warning">
          <Linkify
            decoraction="subtitle"
            text="Para asignar los cambios, simplemete ingrese la contraseña nueva en el
            campo 'Contraseña nueva'. Recuerde que no puede ingresar a Te Vi
            Colombia hasta que el proceso de cambio de contraseña sea completado, si
            la llave de esta sección esta caducada, intente ingresando nuevamente su
            correo en la área de cambio de contraseña."
            length={100}
          />
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
                  variables: { newPassword: values.newPassword, key, type }
                });

                // if forgotPasswordChange has data, it has the errors
                if (
                  data.forgotPasswordChange &&
                  data.forgotPasswordChange.length
                ) {
                  setSubmitting(false);
                  setErrors(normalizeErrors(data.forgotPasswordChange));
                  const node = document.querySelector(
                    `[name="${data.forgotPasswordChange[0].path}"]`
                  );
                  scrollIntoView(node);
                } else {
                  setSubmitting(false);
                  Router.push("/login");
                }
              }}
              render={({ isSubmitting }) => (
                <Form method="POST" style={{ padding: "0 10vw" }}>
                  <label htmlFor="newPassword" className="label">
                    Contraseña nueva
                  </label>
                  <TextField
                    type="password"
                    id="newPassword"
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

changePassword.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default withRouter(changePassword);
