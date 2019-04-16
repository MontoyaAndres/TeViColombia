import React, { useEffect, memo } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import AskModal from "../../shared/askModal";
import {
  TextField,
  TextAreaField,
  SelectField,
  RadioField
} from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";
import TownsByDepartament from "../../../utils/townsByDepartament";
import TagField from "../../shared/tagField";
import { EmployValidation } from "../../../utils/validation";
import { employsQuery } from "../../../graphql/queries/account";
import normalizeErrors from "../../../utils/normalizeErrors";

const createEmployMutation = gql`
  mutation CreateEmployMutation($id: ID!, $employ: EmployInput) {
    employ(id: $id, employ: $employ) {
      path
      message
    }
  }
`;

const createEmployModal = ({
  createEmploy,
  handleAskCreateEmploy,
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue
}) => {
  useEffect(() => {
    // When the `departament` value changes, reseting the `town` value.
    if (values.departament !== "Extranjero") {
      values.town = Object.values(TownsByDepartament[values.departament])[0];
    }
  }, [values.departament]);

  useEffect(() => {
    // If the employ is foreign, it shouldn't has a town.
    if (values.country !== "Colombia" || values.departament === "Extranjero") {
      values.town = "";
    }
  }, [values.country, values.departament]);

  return (
    <AskModal
      title="Crear nuevo empleo"
      active={createEmploy}
      handleAskFunction={handleAskCreateEmploy}
      mutation={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <Form method="POST">
        <label htmlFor="position" className="label">
          Posición de trabajo
        </label>
        <TextField
          type="text"
          id="position"
          name="position"
          placeholder="Posición de trabajo"
          isRequired
        />

        <label htmlFor="description" className="label">
          Descripción de trabajo
        </label>
        <TextAreaField
          type="text"
          id="description"
          name="description"
          placeholder="Descripción de trabajo"
          isRequired
        />

        <label htmlFor="area" className="label">
          Area
        </label>
        <SelectField
          id="area"
          name="area"
          arrayPlaceholder={EntityGlobalEnum.ENUMArea}
          isRequired
        />

        <label htmlFor="skills" className="label">
          Habilidades
        </label>
        <TagField
          id="skills"
          name="skills"
          placeholder="Habilidades"
          setFieldValue={setFieldValue}
          values={values.skills}
        />

        <label htmlFor="minStudy" className="label">
          Educación mínima
        </label>
        <SelectField
          id="minStudy"
          name="minStudy"
          arrayPlaceholder={EntityGlobalEnum.ENUMStudyLevel}
          isRequired
        />

        <label htmlFor="minExperience" className="label">
          Años de experiencia
        </label>
        <TextField
          type="number"
          id="minExperience"
          pattern="\d*"
          name="minExperience"
          placeholder="Años de experiencia"
          isRequired
        />

        <label htmlFor="language" className="label">
          Idiomas
        </label>
        <TagField
          name="language"
          id="language"
          placeholder="Idiomas"
          setFieldValue={setFieldValue}
          values={values.language}
        />

        <label htmlFor="travel" className="label">
          Disponibilidad para viajar
        </label>
        <RadioField
          name="travel"
          id="travel"
          arrayRadio={["Sí", "No"]}
          isRequired
        />

        <label htmlFor="residence" className="label">
          Disponibilidad de cambio de residencia
        </label>
        <RadioField
          name="residence"
          id="residence"
          arrayRadio={["Sí", "No"]}
          isRequired
        />

        <label htmlFor="country" className="label">
          País
        </label>
        <SelectField
          name="country"
          id="country"
          arrayPlaceholder={EntityGlobalEnum.ENUMCountry}
          isRequired
        />

        <label htmlFor="departament" className="label">
          Departamento
        </label>
        <SelectField
          name="departament"
          id="departament"
          arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
          isRequired
        />

        {values.departament !== "Extranjero" &&
        values.country === "Colombia" ? (
          <>
            <label htmlFor="town" className="label">
              Municipio
            </label>
            <SelectField
              name="town"
              id="town"
              arrayPlaceholder={Object.values(
                TownsByDepartament[values.departament]
              )}
              placeholder="Municipio"
              isRequired
            />
          </>
        ) : null}

        <label htmlFor="time" className="label">
          Jornada
        </label>
        <SelectField
          name="time"
          id="time"
          arrayPlaceholder={[
            "Jornada completa",
            "Desde casa",
            "Jornada reducida",
            "Trabajo a turnos",
            "Jornada partida",
            "Trabajo nocturno",
            "Trabajo en festivos",
            "Tiempo completo"
          ]}
          isRequired
        />

        <label htmlFor="contract" className="label">
          Tipo de contrato
        </label>
        <SelectField
          name="contract"
          id="contract"
          arrayPlaceholder={[
            "Contrato a plazo fijo",
            "Contrato eventual",
            "Sin especificar",
            "Contrato de temporada",
            "Contrato de grupo o por equipo",
            "Otro tipo de contrato"
          ]}
          isRequired
        />

        <label htmlFor="currency" className="label">
          Moneda
        </label>
        <SelectField
          name="currency"
          id="currency"
          arrayPlaceholder={EntityGlobalEnum.ENUMCurrency}
          isRequired
        />

        <label htmlFor="minSalary" className="label">
          Salario mínimo
        </label>
        <TextField
          type="number"
          id="minSalary"
          name="minSalary"
          pattern="\d*"
          placeholder="Salario mínimo"
          isRequired
        />

        <label htmlFor="maxSalary" className="label">
          Salario maximo
        </label>
        <TextField
          type="number"
          id="maxSalary"
          name="maxSalary"
          pattern="\d*"
          placeholder="Salario maximo"
          isRequired
        />
      </Form>
    </AskModal>
  );
};

export default compose(
  graphql(createEmployMutation, { name: "CREATE_EMPLOY_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({
      position: "",
      description: "",
      area: "Administración / Oficina",
      skills: "",
      minStudy: "EDUCACIÓN BÁSICA PRIMARIA",
      minExperience: 1,
      language: "",
      travel: "No",
      residence: "No",
      country: "Colombia",
      departament: "Bogotá, D.C.",
      town: "Bogotá, D.C.",
      time: "Jornada completa",
      contract: "Contrato a plazo fijo",
      currency: "Modena local",
      minSalary: "",
      maxSalary: ""
    }),
    validationSchema: EmployValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      {
        props: { id, CREATE_EMPLOY_MUTATION, handleAskCreateEmploy },
        setSubmitting,
        setErrors,
        resetForm
      }
    ) => {
      const { data } = await CREATE_EMPLOY_MUTATION({
        variables: { id, employ: values },
        refetchQueries: [{ query: employsQuery, variables: { businessId: id } }]
      });

      // if employ has data, it has the errors
      if (data.employ && data.employ.length) {
        setSubmitting(false);
        setErrors(normalizeErrors(data.employ));
        const node = document.querySelector(`[name="${data.employ[0].path}"]`);
        scrollIntoView(node);
      } else {
        setSubmitting(false);
        resetForm();
        handleAskCreateEmploy();
      }
    }
  })
)(memo(createEmployModal));
