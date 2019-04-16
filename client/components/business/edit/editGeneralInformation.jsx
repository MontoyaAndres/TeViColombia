import React from "react";

import {
  TextField,
  TextFieldAddonsCountry,
  SelectField
} from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";
import TownsByDepartament from "../../../utils/townsByDepartament";
import EditSkills from "../../../containers/edit/editSkills";

const editGeneralInformation = ({
  departament,
  nationality,
  skills,
  setFieldValue
}) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Información general</div>
    </div>

    <div className="card-content">
      <div className="content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <label htmlFor="description" className="label">
              Descripción de perfil profesional
            </label>
            <TextField
              type="text"
              id="description"
              name="description"
              placeholder="Descripción de perfil profesional"
              isRequired={false}
              maxLength="100"
            />
          </div>

          <div className="column is-6">
            <label htmlFor="name" className="label">
              Nombre de la compañia
            </label>
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Nombre de la compañia"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="address" className="label">
              Dirección, complemento y localidad
            </label>
            <TextField
              type="text"
              id="address"
              name="address"
              placeholder="Dirección"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label htmlFor="telephone" className="label">
              Teléfono celular/fijo
            </label>
            <TextFieldAddonsCountry
              type="number"
              id="telephone"
              pattern="\d*"
              name="telephone"
              selectName="telephoneCountry"
              placeholder="Teléfono celular/fijo"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="telephone2" className="label">
              Teléfono secundario celular/fijo
            </label>
            <TextFieldAddonsCountry
              type="number"
              id="telephone2"
              pattern="\d*"
              name="telephone2"
              selectName="telephone2Country"
              placeholder="Teléfono secundario celular/fijo"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label htmlFor="optionalEmail" className="label">
              Correo electrónico secundario
            </label>
            <TextField
              type="email"
              id="optionalEmail"
              name="optionalEmail"
              placeholder="Correo electrónico secundario"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label htmlFor="nationality" className="label">
              Nacionalidad
            </label>
            <SelectField
              name="nationality"
              id="nationality"
              arrayPlaceholder={EntityGlobalEnum.ENUMCountry}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="departament" className="label">
              Departamento
            </label>
            <SelectField
              name="departament"
              id="departament"
              arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
              isRequired
            />
          </div>

          {departament !== "Extranjero" && nationality === "Colombia" ? (
            <div className="column is-6">
              <label htmlFor="town" className="label">
                Municipio
              </label>
              <SelectField
                name="town"
                id="town"
                arrayPlaceholder={Object.values(
                  TownsByDepartament[departament]
                )}
                placeholder="Municipio"
                isRequired
              />
            </div>
          ) : null}

          <div className="column is-6">
            <label htmlFor="sector" className="label">
              Sector
            </label>
            <SelectField
              name="sector"
              id="sector"
              arrayPlaceholder={EntityGlobalEnum.ENUMSector}
              isRequired
            />
          </div>

          <div className="column is-6">
            <label htmlFor="website" className="label">
              Sitio web
            </label>
            <TextField
              type="url"
              id="website"
              name="website"
              placeholder="Sitio web"
              isRequired={false}
            />
          </div>

          <EditSkills skills={skills} setFieldValue={setFieldValue} />
        </div>
      </div>
    </div>
  </div>
);

export default editGeneralInformation;
