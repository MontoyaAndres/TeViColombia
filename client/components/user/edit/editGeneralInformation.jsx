import React from "react";

import {
  SelectField,
  TextField,
  TextFieldAddonsCountry,
  RadioField
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
            <label className="label">Descripción de perfil profesional</label>
            <TextField
              type="text"
              name="description"
              placeholder="Descripción de perfil profesional"
              isRequired={false}
              maxLength="100"
            />
          </div>

          <div className="column is-6">
            <label className="label">Nombres</label>
            <TextField
              type="text"
              name="name"
              placeholder="Nombre"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Apellidos</label>
            <TextField
              type="text"
              name="lastname"
              placeholder="Apellido"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Documento de identidad</label>
            <SelectField
              arrayPlaceholder={[
                "CÉDULA DE CIUDADANÍA",
                "CÉDULA DE EXTRANJERÍA",
                "TARJETA DE IDENTIDAD",
                "PASAPORTE",
                "NÚMERO DE IDENTIFICACIÓN"
              ]}
              name="identificationDocumentType"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Número de documento</label>
            <TextField
              type="number"
              pattern="\d*"
              name="identificationDocument"
              placeholder="Número de documento"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Dirección, complemento y localidad</label>
            <TextField
              type="text"
              name="address"
              placeholder="Dirección"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Teléfono celular/fijo</label>
            <TextFieldAddonsCountry
              type="number"
              pattern="\d*"
              name="telephone"
              selectName="telephoneCountry"
              placeholder="Teléfono celular/fijo"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Teléfono secundario celular/fijo</label>
            <TextFieldAddonsCountry
              type="number"
              pattern="\d*"
              name="telephone2"
              selectName="telephone2Country"
              placeholder="Teléfono secundario celular/fijo"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Género</label>
            <SelectField
              arrayPlaceholder={["HOMBRE", "MUJER"]}
              name="gender"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">¿Tiene alguna discapacidad?</label>
            <RadioField
              name="disability"
              arrayRadio={["Sí", "No"]}
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Correo electrónico secundario</label>
            <TextField
              type="email"
              name="optionalEmail"
              placeholder="Correo electrónico secundario"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Estado civil</label>
            <SelectField
              arrayPlaceholder={[
                "SOLTERO(A)",
                "CASADO(A)",
                "SEPARADO(A)/DIVORCIADO(A)",
                "VIUDO(A)"
              ]}
              name="civilStatus"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Nacionalidad</label>
            <SelectField
              arrayPlaceholder={EntityGlobalEnum.ENUMCountry}
              name="nationality"
              isRequired
            />
          </div>

          <div className="column is-6">
            <label className="label">Departamento</label>
            <SelectField
              arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
              name="departament"
              isRequired
            />
          </div>

          {departament !== "Extranjero" && nationality === "Colombia" ? (
            <div className="column is-6">
              <label className="label">Municipio</label>
              <SelectField
                arrayPlaceholder={Object.values(
                  TownsByDepartament[departament]
                )}
                name="town"
                placeholder="Municipio"
                isRequired
              />
            </div>
          ) : null}

          <div className="column is-6">
            <label className="label">Fecha de nacimiento</label>
            <TextField
              type="date"
              name="birth"
              placeholder="Fechas de nacimiento"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Sitio web</label>
            <TextField
              type="url"
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
