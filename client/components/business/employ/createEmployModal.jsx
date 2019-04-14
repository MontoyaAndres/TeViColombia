import React, { useEffect, memo } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";

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
        <label className="label">Posición de trabajo</label>
        <TextField
          type="text"
          name="position"
          placeholder="Posición de trabajo"
          isRequired
        />

        <label className="label">Descripción de trabajo</label>
        <TextAreaField
          type="text"
          name="description"
          placeholder="Descripción de trabajo"
          isRequired
        />

        <label className="label">Area</label>
        <SelectField
          name="area"
          arrayPlaceholder={EntityGlobalEnum.ENUMArea}
          isRequired
        />

        <label className="label">Habilidades</label>
        <TagField
          name="skills"
          placeholder="Habilidades"
          setFieldValue={setFieldValue}
          values={values.skills}
        />

        <label className="label">Educación mínima</label>
        <SelectField
          name="minStudy"
          arrayPlaceholder={EntityGlobalEnum.ENUMStudyLevel}
          isRequired
        />

        <label className="label">Años de experiencia</label>
        <TextField
          type="number"
          pattern="\d*"
          name="minExperience"
          placeholder="Años de experiencia"
          isRequired
        />

        <label className="label">Idiomas</label>
        <TagField
          name="language"
          placeholder="Idiomas"
          setFieldValue={setFieldValue}
          values={values.language}
        />

        <label className="label">Disponibilidad para viajar</label>
        <RadioField name="travel" arrayRadio={["Sí", "No"]} isRequired />

        <label className="label">Disponibilidad de cambio de residencia</label>
        <RadioField name="residence" arrayRadio={["Sí", "No"]} isRequired />

        <label className="label">País</label>
        <SelectField
          name="country"
          arrayPlaceholder={EntityGlobalEnum.ENUMCountry}
          isRequired
        />

        <label className="label">Departamento</label>
        <SelectField
          name="departament"
          arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
          isRequired
        />

        {values.departament !== "Extranjero" &&
        values.country === "Colombia" ? (
          <>
            <label className="label">Municipio</label>
            <SelectField
              arrayPlaceholder={Object.values(
                TownsByDepartament[values.departament]
              )}
              name="town"
              placeholder="Municipio"
              isRequired
            />
          </>
        ) : null}

        <label className="label">Jornada</label>
        <SelectField
          name="time"
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

        <label className="label">Tipo de contrato</label>
        <SelectField
          name="contract"
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

        <label className="label">Moneda</label>
        <SelectField
          name="currency"
          arrayPlaceholder={EntityGlobalEnum.ENUMCurrency}
          isRequired
        />

        <label className="label">Salario mínimo</label>
        <TextField
          type="number"
          pattern="\d*"
          name="minSalary"
          placeholder="Salario mínimo"
          isRequired
        />

        <label className="label">Salario maximo</label>
        <TextField
          type="number"
          pattern="\d*"
          name="maxSalary"
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
        document.querySelector(`[name="${data.employ[0].path}"]`).focus();
      } else {
        setSubmitting(false);
        resetForm();
        handleAskCreateEmploy();
      }
    }
  })
)(memo(createEmployModal));
