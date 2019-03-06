import React from "react";
import { withFormik, Form } from "formik";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import omit from "lodash.omit";
import Link from "next/link";

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
  <RegisterContainer
    registered={values.registered}
    errorRegistered={values.errorRegistered}
    setFieldValue={setFieldValue}
  >
    <Form method="POST" onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="name"
        placeholder="Nombre de la compañia"
        isRequired
      />

      <TextFieldAddonsCountry
        type="number"
        pattern="\d*"
        selectName="telephoneCountry"
        name="telephone"
        placeholder="Teléfono celular/fijo"
        isRequired
      />

      <SelectField
        name="sector"
        arrayPlaceholder={EntityGlobalEnum.ENUMSector}
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

      <label className="checkbox" style={{ padding: "1em" }}>
        <Link href="/register" prefetch>
          <a>Registrar nueva cuenta para usuarios</a>
        </Link>
      </label>
    </Form>
  </RegisterContainer>
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
          ["registered", "errorRegistered"]
        )
      });

      // if registerBusiness has data, it has the errors
      if (data.registerBusiness && data.registerBusiness.length) {
        setSubmitting(false);
        setFieldValue("registered", false, false);
        setFieldValue("errorRegistered", true, false);
        setErrors(normalizeErrors(data.registerBusiness));
      } else {
        setSubmitting(false);
        resetForm();
        setFieldValue("registered", true, false);
        setFieldValue("errorRegistered", false, false);
      }

      window.scrollTo({
        top: document.getElementById("registered").offsetTop - 100,
        behavior: "smooth"
      });
    }
  })
)(registerBusiness);
