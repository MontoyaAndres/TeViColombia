import React from "react";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";
import Link from "next/link";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import {
  TextField,
  SelectField,
  TextFieldAddonsCountry
} from "../components/shared/globalField";
import { RegisterBusinessValidation } from "../utils/validation";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import EntityGlobalEnum from "../utils/entityGlobalEnum";
import RegisterContainer from "../containers/register";

const registerBusinessMutation = gql`
  mutation RegisterBusinessMutation(
    $name: String!
    $telephoneCountry: Int!
    $telephone: BigInt!
    $sector: String!
    $email: String!
    $password: String!
  ) {
    registerBusiness(
      name: $name
      telephoneCountry: $telephoneCountry
      telephone: $telephone
      sector: $sector
      email: $email
      password: $password
    ) {
      path
      message
    }
  }
`;

const registerBusiness = ({
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => (
  <>
    <style jsx>{`
      label {
        text-align: initial;
      }
    `}</style>

    <RegisterContainer
      registered={values.registered}
      setFieldValue={setFieldValue}
    >
      <Form method="POST" onSubmit={handleSubmit}>
        <label className="label title is-5" htmlFor="name">
          Nombres de la compañia
        </label>
        <TextField
          type="text"
          id="name"
          name="name"
          placeholder="Nombre de la compañia"
          isRequired
        />

        <label className="label title is-5" htmlFor="telephone">
          Teléfono celular/fijo
        </label>
        <TextFieldAddonsCountry
          type="number"
          id="telephone"
          pattern="\d*"
          selectName="telephoneCountry"
          name="telephone"
          placeholder="Teléfono celular/fijo"
          isRequired
        />

        <label className="label title is-5" htmlFor="sector">
          Sector de la empresa
        </label>
        <SelectField
          name="sector"
          id="sector"
          arrayPlaceholder={EntityGlobalEnum.ENUMSector}
          isRequired
        />

        <label className="label title is-5" htmlFor="email">
          Correo electrónico
        </label>
        <TextField
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          isRequired
        />

        <label className="label title is-5" htmlFor="password">
          Contraseña
        </label>
        <TextField
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          isRequired
        />

        <label
          htmlFor="terms"
          className="checkbox"
          style={{ paddingBottom: "1em" }}
        >
          <input id="terms" type="checkbox" required /> He leido los{" "}
          <Link href="/terms">
            <a>terminos y condiciones</a>
          </Link>
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

        <label className="checkbox" style={{ padding: "1em" }}>
          <Link href="/register">
            <a>Registrar nueva cuenta para usuarios</a>
          </Link>
        </label>
      </Form>
    </RegisterContainer>
  </>
);

registerBusiness.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default compose(
  graphql(registerBusinessMutation),
  withFormik({
    mapPropsToValues: () => ({
      name: "",
      telephoneCountry: 57,
      telephone: "",
      sector: "Agricultura / Pesca / Ganadería",
      email: "",
      password: ""
    }),
    validationSchema: RegisterBusinessValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      { props: { mutate }, setSubmitting, setErrors, resetForm, setFieldValue }
    ) => {
      const { data } = await mutate({
        variables: omit(
          { ...values, telephoneCountry: Number(values.telephoneCountry) },
          ["registered"]
        )
      });

      // if registerBusiness has data, it has the errors
      if (data.registerBusiness && data.registerBusiness.length) {
        setSubmitting(false);
        setFieldValue("registered", false, false);
        setErrors(normalizeErrors(data.registerBusiness));
        const node = document.querySelector(
          `[name="${data.registerBusiness[0].path}"]`
        );
        scrollIntoView(node);
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("registered", true, false);
        const node = document.getElementById("registered");
        scrollIntoView(node);
      }
    }
  })
)(registerBusiness);
