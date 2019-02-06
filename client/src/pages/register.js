import React, { PureComponent } from "react";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { TextField, SelectField } from "../components/shared/globalField";
import { RegisterValidation } from "../utils/validation";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const registerMutation = gql`
  mutation RegisterMutation(
    $name: String!
    $lastname: String!
    $telephone: BigInt!
    $identificationDocumentType: String!
    $identificationDocument: BigInt!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      lastname: $lastname
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

class register extends PureComponent {
  state = {
    intervalId: 0
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.values.registered) {
      const intervalId = setInterval(this.scrollStep.bind(this), 16.66);
      this.setState({ intervalId });
    }
  }

  scrollStep() {
    const { intervalId } = this.state;

    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  }

  render() {
    const { values, handleSubmit, isSubmitting, setFieldValue } = this.props;

    return (
      <div className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            {/* User created successfully */}
            {values.registered && (
              <div className="animated bounceIn notification is-primary">
                <button
                  type="button"
                  className="delete"
                  onClick={() => setFieldValue("registered", false, false)}
                />
                Por favor revise su correo electrónico para poder entrar a Te vi
                EPE.
              </div>
            )}

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
  }
}

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
      const response = await mutate({
        variables: values
      });
      const { data } = response;
      // if login has data, it has the errors
      if (data.register && data.register.length) {
        setSubmitting(false);
        setFieldValue("registered", false, false);
        setErrors(normalizeErrors(data.register));
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("registered", true, false);
      }
    }
  })
)(register);
