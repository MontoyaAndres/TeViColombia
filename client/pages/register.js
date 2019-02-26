import React, { useState } from "react";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";

import {
  TextField,
  SelectField,
  TextFieldAddonsCountry
} from "../components/shared/globalField";
import { RegisterValidation } from "../utils/validation";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const registerMutation = gql`
  mutation RegisterMutation(
    $name: String!
    $lastname: String!
    $telephoneCountry: Int!
    $telephone: BigInt!
    $identificationDocumentType: String!
    $identificationDocument: BigInt!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      lastname: $lastname
      telephoneCountry: $telephoneCountry
      telephone: $telephone
      identificationDocumentType: $identificationDocumentType
      identificationDocument: $identificationDocument
      email: $email
      password: $password
    ) {
      path
      message
    }
  }
`;

const register = ({ values, handleSubmit, isSubmitting, setFieldValue }) => {
  const [light, setLight] = useState(true);

  return (
    <div className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          {/* User created successfully */}
          {values.registered && (
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
                    light
                      ? "/static/img/lightOn.svg"
                      : "/static/img/lightOff.svg"
                  }
                  onClick={() => setLight(!light)}
                  alt="login"
                />
              </figure>
              <Form method="POST" onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  name="name"
                  placeholder="Nombres"
                  isRequired
                />

                <TextField
                  type="text"
                  name="lastname"
                  placeholder="Apellidos"
                  isRequired
                />

                <TextFieldAddonsCountry
                  type="number"
                  pattern="\d*"
                  selectName="telephoneCountry"
                  name="telephone"
                  placeholder="Teléfono secundario celular/fijo/oficina"
                  isRequired
                />

                <SelectField
                  name="identificationDocumentType"
                  arrayPlaceholder={[
                    "Tarjeta de identidad",
                    "Cédula de ciudadania"
                  ]}
                  isRequired
                />

                <TextField
                  type="number"
                  pattern="\d*"
                  name="identificationDocument"
                  placeholder="Número de documento"
                  isRequired
                />

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

                <label className="checkbox" style={{ paddingBottom: "1em" }}>
                  <input type="checkbox" required /> He leido los{" "}
                  <a href="#">terminos y condiciones</a>
                </label>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

register.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default compose(
  graphql(registerMutation),
  withFormik({
    mapPropsToValues: () => ({
      name: "",
      lastname: "",
      telephoneCountry: 57,
      telephone: "",
      identificationDocumentType: "Tarjeta de identidad",
      identificationDocument: "",
      email: "",
      password: ""
    }),
    validationSchema: RegisterValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setErrors, resetForm, setFieldValue }
    ) => {
      const { data } = await mutate({
        variables: omit(
          { values, telephoneCountry: Number(values.telephoneCountry) },
          ["registered"]
        )
      });

      // if login has data, it has the errors
      if (data.register && data.register.length) {
        setSubmitting(false);
        setFieldValue("registered", false, false);
        setErrors(normalizeErrors(data.register));
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("registered", true, false);
        window.scrollTo({
          top: document.getElementById("registered").offsetTop - 100,
          behavior: "smooth"
        });
      }
    }
  })
)(register);
