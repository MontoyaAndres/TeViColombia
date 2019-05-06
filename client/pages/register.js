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
  TextFieldAddonsCountry,
  RadioField
} from "../components/shared/globalField";
import { RegisterValidation } from "../utils/validation";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import RegisterContainer from "../containers/register";
import EntityGlobalEnum from "../utils/entityGlobalEnum";

const registerMutation = gql`
  mutation RegisterMutation(
    $name: String!
    $lastname: String!
    $telephoneCountry: Int!
    $telephone: BigInt!
    $identificationDocumentType: String!
    $identificationDocument: BigInt!
    $isStudent: Boolean!
    $universityCareer: String
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
      isStudent: $isStudent
      universityCareer: $universityCareer
      email: $email
      password: $password
    ) {
      path
      message
    }
  }
`;

const register = ({ values, handleSubmit, isSubmitting, setFieldValue }) => (
  <>
    <style jsx>{`
      label {
        text-align: initial;
      }

      div {
        padding-top: 3px;
        padding-bottom: 9px;
      }
    `}</style>

    <RegisterContainer
      registered={values.registered}
      setFieldValue={setFieldValue}
    >
      <Form method="POST" onSubmit={handleSubmit}>
        <label className="label title is-5" htmlFor="name">
          Nombres
        </label>
        <TextField
          type="text"
          id="name"
          name="name"
          placeholder="Nombres"
          isRequired
        />

        <label className="label title is-5" htmlFor="lastname">
          Apellidos
        </label>
        <TextField
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Apellidos"
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

        <label
          className="label title is-5"
          htmlFor="identificationDocumentType"
        >
          Tipo de documento
        </label>
        <SelectField
          name="identificationDocumentType"
          id="identificationDocumentType"
          arrayPlaceholder={EntityGlobalEnum.ENUMIdentificationDocumentType}
          isRequired
        />

        <label className="label title is-5" htmlFor="identificationDocument">
          Número de documento
        </label>
        <TextField
          type="number"
          id="identificationDocument"
          pattern="\d*"
          name="identificationDocument"
          placeholder="Número de documento"
          isRequired
        />

        <div>
          <label className="label title is-5" htmlFor="isStudent">
            ¿Eres estudiante, egresado o graduado en UNIMINUTO?
          </label>
          <RadioField
            name="isStudent"
            id="isStudent"
            arrayRadio={["Sí", "No"]}
            isRequired
          />
        </div>

        {values.isStudent === "Sí" && (
          <>
            <label className="label title is-5" htmlFor="universityCareer">
              Carrera universitaria UNIMINUTO
            </label>
            <SelectField
              name="universityCareer"
              id="universityCareer"
              arrayPlaceholder={EntityGlobalEnum.ENUMUniversityCareerUNIMINUTO}
              isRequired={false}
            />
          </>
        )}

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
          <input type="checkbox" id="terms" required /> He leido los{" "}
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
          <Link href="/register-business">
            <a>Registrar nueva cuenta para empresas</a>
          </Link>
        </label>
      </Form>
    </RegisterContainer>
  </>
);

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
      identificationDocumentType: "CÉDULA DE CIUDADANÍA",
      identificationDocument: "",
      isStudent: "No",
      universityCareer: "ADFU",
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
      // `isStudent` is a boolean, it cannot save text. Also `registered` is not required to save it
      const { data } = await mutate({
        variables: omit(
          {
            ...values,
            telephoneCountry: Number(values.telephoneCountry),
            isStudent: values.isStudent === "Sí"
          },
          ["registered"]
        )
      });

      // if register has data, it has the errors
      if (data.register && data.register.length) {
        setSubmitting(false);
        setFieldValue("registered", false, false);
        setErrors(normalizeErrors(data.register));
        const node = document.querySelector(
          `[name="${data.register[0].path}"]`
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
)(register);
