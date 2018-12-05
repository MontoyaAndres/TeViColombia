import React from "react";
import { withFormik, Form } from "formik";

import { TextField, SelectField } from "../components/shared/globalField";
import { RegisterValidation } from "../utils/validation";
import { register } from "../api/auth";
import normalizeErrors from "../utils/normalizeErrors";

const Register = ({ handleSubmit, isSubmitting }) => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Crea una nueva cuenta</h3>
          <div className="box animated bounceInLeft">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="login" />
            </figure>
            <Form method="POST" onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="name"
                placeholder="Nombre"
                isRequired
              />

              <TextField
                type="text"
                name="lastname"
                placeholder="Apellido"
                isRequired
              />

              <TextField
                type="number"
                pattern="\d*"
                name="telephone"
                placeholder="Teléfono celular"
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

              <label className="checkbox" style={{ padding: "0.5em 0" }}>
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

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    lastname: "",
    telephone: "",
    identificationDocumentType: "Tarjeta de identidad",
    identificationDocument: "",
    email: "",
    password: ""
  }),
  validationSchema: RegisterValidation,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
    const response = await register(values);
    const { ok, errors } = response;
    if (ok) {
      setSubmitting(false);
      resetForm();
      console.log("confirme su correo");
    } else {
      setSubmitting(false);
      setErrors(normalizeErrors(errors));
    }
  }
})(Register);
