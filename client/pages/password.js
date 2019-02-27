import React from "react";
import { Form, withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";

import { TextField } from "../components/shared/globalField";
import normalizeErrors from "../utils/normalizeErrors";

const sendForgotPasswordEmailMutation = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

const password = ({ values, isSubmitting }) => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div id="sended" className="container animated bounceInLeft">
        {values.sended ? (
          <div className="notification is-primary">
            <p className="subtitle">
              Por favor revise su correo electrónico para poder cambiar la
              contraseña en Te vi Colombia.
            </p>
          </div>
        ) : (
          <div className="notification is-warning">
            Este campo es exclusivo para cambiar la contraseña de el correo
            electrónico que va a ingresar en el campo{" "}
            <span style={{ fontWeight: "bold" }}>Correo electrónico</span>. Una
            vez dado clic en <span style={{ fontWeight: "bold" }}>Enviar</span>,
            se va a enviar un mensaje que trae consigo una URL de Te vi Colombia
            con una llave, esto para verificar que el correo electrónico
            ingresado es valido y así mismo cumplir con el proceso de asignar
            una nueva contraseña. Esta URL puede estar activa únicamente por 20
            minutos, si caduca debe de repetir este proceso nuevamente. Si este
            mensaje no llega a ser aceptado por el dueño del correo electrónico,
            la cuenta se mantendra bloqueada hasta que se cumpla su respectiva
            confirmación. Todas las secciones establecidas en teléfonos, laptops
            y computadoras hechas por el correo electrónico serán eliminadas
            para evitar posibles inconvenientes.
          </div>
        )}

        <Form method="POST" style={{ padding: "0 10vw" }}>
          <label className="label">Correo electrónico</label>
          <TextField
            type="email"
            name="email"
            placeholder="Correo electrónico"
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
      </div>
    </div>
  </div>
);

export default compose(
  graphql(sendForgotPasswordEmailMutation),
  withFormik({
    mapPropsToValues: () => ({
      email: ""
    }),
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setErrors, setFieldValue, resetForm }
    ) => {
      const { data } = await mutate({
        variables: omit(values, ["sended"])
      });

      // if sendForgotPasswordEmail has data, it has the errors
      if (data.sendForgotPasswordEmail && data.sendForgotPasswordEmail.length) {
        setSubmitting(false);
        setFieldValue("sended", false, false);
        setErrors(normalizeErrors(data.sendForgotPasswordEmail));
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("sended", true, false);
        window.scrollTo({
          top: document.getElementById("sended").offsetTop - 100,
          behavior: "smooth"
        });
      }
    }
  })
)(password);
