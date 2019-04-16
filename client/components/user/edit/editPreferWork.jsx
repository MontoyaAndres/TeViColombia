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
            <label htmlFor="preferWork.currentSituation" className="label">
              Situación actual
            </label>
            <SelectField
              name="preferWork.currentSituation"
              id="preferWork.currentSituation"
              arrayPlaceholder={EntityGlobalEnum.ENUMCurrentSituation}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.job" className="label">
              Puesto de trabajo deseado
            </label>
            <TextField
              type="text"
              id="preferWork.job"
              name="preferWork.job"
              placeholder="Puesto de trabajo deseado"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.salary" className="label">
              Salario mínimo aceptado
            </label>
            <TextField
              type="number"
              id="preferWork.salary"
              name="preferWork.salary"
              pattern="\d*"
              placeholder="Salario mínimo aceptado"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.currency" className="label">
              Moneda
            </label>
            <SelectField
              id="preferWork.currency"
              name="preferWork.currency"
              arrayPlaceholder={["Modena local", "US Dólar"]}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.area" className="label">
              Área
            </label>
            <SelectMultipleField
              id="preferWork.area"
              name="preferWork.area"
              arrayPlaceholder={EntityGlobalEnum.ENUMArea}
              setFieldValue={setFieldValue}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.departament" className="label">
              Departamento
            </label>
            <SelectMultipleField
              id="preferWork.departament"
              name="preferWork.departament"
              arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
              setFieldValue={setFieldValue}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.travel" className="label">
              Disponibilidad para viajar
            </label>
            <RadioField
              id="preferWork.travel"
              name="preferWork.travel"
              arrayRadio={["Sí", "No"]}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="preferWork.residence" className="label">
              Disponibilidad para cambiar de residencia
            </label>
            <RadioField
              id="preferWork.residence"
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
