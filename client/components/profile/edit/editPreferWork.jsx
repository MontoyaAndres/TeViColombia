import React from "react";

import {
  SelectField,
  TextField,
  RadioField,
  SelectMultipleField
} from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";

const editPreferWork = ({ setFieldValue }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Preferencias de empleo</div>
    </div>

    <div className="card-content">
      <div className="content">
        <div className="columns is-multiline">
          <div className="column is-6">
            <label className="label">Situación actual</label>
            <SelectField
              name="preferWork.currentSituation"
              arrayPlaceholder={EntityGlobalEnum.ENUMCurrentSituation}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Puesto de trabajo deseado</label>
            <TextField
              type="text"
              name="preferWork.job"
              placeholder="Puesto de trabajo deseado"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Área</label>
            <SelectMultipleField
              name="preferWork.area"
              arrayPlaceholder={EntityGlobalEnum.ENUMArea}
              setFieldValue={setFieldValue}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Salario mínimo aceptado</label>
            <TextField
              type="number"
              pattern="\d*"
              name="preferWork.salary"
              placeholder="Salario mínimo aceptado"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Departamento</label>
            <SelectMultipleField
              name="preferWork.departament"
              arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
              setFieldValue={setFieldValue}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Disponibilidad para viajar</label>
            <RadioField
              name="preferWork.travel"
              arrayRadio={["Sí", "No"]}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">
              Disponibilidad para cambiar de residencia
            </label>
            <RadioField
              name="preferWork.residence"
              arrayRadio={["Sí", "No"]}
              isRequired
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default editPreferWork;
