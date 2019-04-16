import React from "react";
import { Form, withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { TextField, RadioField } from "../components/shared/globalField";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import Linkify from "../components/shared/linkify";

const sendForgotPasswordEmailMutation = gql`
  mutation SendForgotPasswordEmailMutation($email: String!, $type: String!) {
    sendForgotPasswordEmail(email: $email, type: $type) {
      path
      message
    }
  }
`;

const password = ({ values, handleSubmit, isSubmitting }) => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div id="sent" className="container animated bounceInLeft">
        {values.sent ? (
          <div className="notification is-primary">
            <p className="subtitle">
              Por favor revise su correo electrónico para poder cambiar la
              contraseña en Te Vi Colombia.
            </p>
          </div>
        ) : (
          <div className="notification is-warning">
            <Linkify
              decoraction="subtitle"
              text="Para asignar los cambios, ingrese el correo electrónico en el campo
              'Correo electrónico' y elija que tipo de cuenta es la que tiene. Una vez
              dado clic en 'Enviar', se va a enviar un mensaje que trae consigo una
              URL de Te Vi Colombia con una llave, esto es para verificar que el
              correo electrónico ingresado es valido y así mismo cumplir con el
              proceso de asignar una nueva contraseña. Esta URL puede estar activa
              únicamente por 20 minutos, si caduca debe de repetir este proceso
              nuevamente. Si este mensaje no llega a ser aceptado por el propietario
              del correo electrónico, la cuenta se mantendra bloqueada hasta que se
              cumpla su respectiva confirmación. Todas las secciones establecidas en
              teléfonos, laptops y computadoras hechas por el correo electrónico serán
              eliminadas para evitar posibles inconvenientes."
              length={150}
            />
          </div>
        )}

        <Form
          method="POST"
          onSubmit={handleSubmit}
          style={{ padding: "0 10vw" }}
        >
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

          <label className="label">Tipo de cuenta</label>
          <div className="field">
            <RadioField
              id="type"
              name="type"
              arrayRadio={["Usuario", "Empresa"]}
              isRequired
            />
          </div>

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
      </div>
    </div>
  </div>
);

password.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default compose(
  graphql(sendForgotPasswordEmailMutation),
  withFormik({
    mapPropsToValues: () => ({
      email: "",
      type: "Usuario"
    }),
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setErrors, setFieldValue, resetForm }
    ) => {
      const { data } = await mutate({
        variables: omit(
          {
            email: values.email,
            type: values.type === "Usuario" ? "User" : "Business"
          },
          ["sent"]
        )
      });

      // if sendForgotPasswordEmail has data, it has the errors
      if (data.sendForgotPasswordEmail && data.sendForgotPasswordEmail.length) {
        setSubmitting(false);
        setFieldValue("sent", false, false);
        setErrors(normalizeErrors(data.sendForgotPasswordEmail));
        const node = document.querySelector(
          `[name="${data.sendForgotPasswordEmail[0].path}"]`
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
)(password);
