import React, { useEffect, memo } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";
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
import { employsQuery, employQuery } from "../../../graphql/queries/account";
import normalizeErrors from "../../../utils/normalizeErrors";

const updateEmployMutation = gql`
  mutation UpdateEmployMutation($id: ID!, $employ: EmployInput) {
    employ(id: $id, employ: $employ) {
      path
      message
    }
  }
`;

const updateEmployModal = ({
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  updateEmploy,
  handleAskUpdateEmploy
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
      title="Editar nuevo empleo"
      active={updateEmploy}
      handleAskFunction={handleAskUpdateEmploy}
      mutation={handleSubmit}
      isSubmitting={isSubmitting}
    >
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
        name="area"
        id="area"
        arrayPlaceholder={EntityGlobalEnum.ENUMArea}
        isRequired
      />

      <label htmlFor="skills" className="label">
        Habilidades
      </label>
      <TagField
        name="skills"
        id="skills"
        placeholder="Habilidades"
        setFieldValue={setFieldValue}
        values={values.skills}
      />

      <label htmlFor="minStudy" className="label">
        Educación mínima
      </label>
      <SelectField
        name="minStudy"
        id="minStudy"
        arrayPlaceholder={EntityGlobalEnum.ENUMStudyLevel}
        isRequired
      />

      <label htmlFor="minExperience" className="label">
        Años de experiencia
      </label>
      <TextField
        type="number"
        id="minExperience"
        name="minExperience"
        pattern="\d*"
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

      {values.departament !== "Extranjero" && values.country === "Colombia" ? (
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
    </AskModal>
  );
};

export default compose(
  graphql(updateEmployMutation, { name: "UPDATE_EMPLOY_MUTATION" }),
  withFormik({
    mapPropsToValues: ({ dataEmploy }) => ({
      id: dataEmploy.id,
      position: dataEmploy.position,
      description: dataEmploy.description,
      area: dataEmploy.area || "Administración / Oficina",
      skills: dataEmploy.skills,
      minStudy: dataEmploy.minStudy || "EDUCACIÓN BÁSICA PRIMARIA",
      minExperience: dataEmploy.minExperience,
      language: dataEmploy.language,
      travel: dataEmploy.travel ? "Sí" : "No",
      residence: dataEmploy.residence ? "Sí" : "No",
      country: dataEmploy.country || "Colombia",
      departament: dataEmploy.departament || "Bogotá, D.C.",
      town: dataEmploy.town || "Bogotá, D.C.",
      time: dataEmploy.time || "Jornada completa",
      contract: dataEmploy.contract || "Contrato a plazo fijo",
      currency: dataEmploy.currency || "Modena local",
      minSalary: dataEmploy.minSalary,
      maxSalary: dataEmploy.maxSalary
    }),
    validationSchema: EmployValidation,
    validateOnBlur: false,
    validateOnChange: false,
    handleSubmit: async (
      values,
      {
        props: {
          id,
          handleAskUpdateEmploy,
          UPDATE_EMPLOY_MUTATION,
          dataEmploy
        },
        setSubmitting,
        setErrors,
        resetForm
      }
    ) => {
      // `travel` and `residence` are boolean, they cannot save text.
      const { data } = await UPDATE_EMPLOY_MUTATION({
        variables: {
          id,
          employ: {
            ...values,
            travel: values.travel === "Sí",
            residence: values.residence === "Sí"
          }
        },
        refetchQueries: [
          { query: employsQuery, variables: { businessId: id } },
          { query: employQuery, variables: { employId: dataEmploy.id } }
        ]
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
        handleAskUpdateEmploy();
      }
    }
  })
)(memo(updateEmployModal));
