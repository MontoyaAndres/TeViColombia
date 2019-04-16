import React from "react";
import { Form, withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import omit from "lodash.omit";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { TextField, TextAreaField } from "../shared/globalField";
import { HelpEmailValidation } from "../../utils/validation";
import normalizeErrors from "../../utils/normalizeErrors";

const helpEmailMutation = gql`
  mutation HelpEmailValidation(
    $name: String!
    $email: String!
    $message: String!
  ) {
    helpEmail(name: $name, email: $email, message: $message) {
      path
      message
    }
  }
`;

const helpEmail = ({ values, setFieldValue, isSubmitting, handleSubmit }) => (
  <section className="section">
    <div className="content">
      {/* Sent successfully */}
      {values.sent && (
        <div
          id="sent"
          className="animated bounceIn notification is-primary"
          style={{ margin: 10 }}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setFieldValue("sent", false, false)}
          />
          <p className="subtitle">¡Correo enviado con exito!</p>
        </div>
      )}

      <h1 className="title">¿Tienes alguna duda?</h1>
      <Form method="POST" onSubmit={handleSubmit}>
        <div className="columns is-multiline">
          <div className="column is-6">
            <label htmlFor="name" className="label">
              Nombres y apellidos
            </label>
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Nombres y apellidos"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            <TextField
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              isRequired
            />
          </div>

          <div className="column is-12">
            <label htmlFor="message" className="label">
              Mensaje a enviar
            </label>
            <TextAreaField
              name="message"
              id="message"
              placeholder="Mensaje"
              isRequired
            />
          </div>

          <div className="column is-12">
            <div className="buttons has-addons is-centered">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`button is-primary is-large ${
                  isSubmitting ? "is-loading" : ""
                }`}
                style={{ width: 200 }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </section>
);

export default compose(
  graphql(helpEmailMutation),
  withFormik({
    mapPropsToValues: () => ({
      name: "",
      email: "",
      message: ""
    }),
    validationSchema: HelpEmailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setErrors, resetForm, setFieldValue }
    ) => {
      const { data } = await mutate({
        variables: omit(values, ["sent"])
      });

      // if helpEmail has data, it has the errors
      if (data.helpEmail && data.helpEmail.length) {
        setSubmitting(false);
        setFieldValue("sent", false, false);
        setErrors(normalizeErrors(data.helpEmail));
        const node = document.querySelector(
          `[name="${data.helpEmail[0].path}"]`
        );
        scrollIntoView(node);
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("sent", true, false);
        const node = document.getElementById("sent");
        scrollIntoView(node);
      }
    }
  })
)(helpEmail);
