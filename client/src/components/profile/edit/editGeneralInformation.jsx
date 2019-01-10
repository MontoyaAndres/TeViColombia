import React from "react";

import {
  TextAreaField,
  SelectField,
  TextField
} from "../../shared/globalField";

const editGeneralInformation = () => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Información general</div>
    </div>

    <div className="card-content">
      <div className="content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <label className="label">Descripción de perfil profesional</label>
            <TextAreaField
              name="description"
              placeholder="Descripción de perfil profesional"
              isRequired={false}
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
            <label className="label">Dirección</label>
            <TextField
              type="text"
              name="address"
              placeholder="Dirección"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Teléfono</label>
            <TextField
              type="number"
              name="telephone"
              placeholder="Teléfono"
              isRequired
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

          <div className="column is-6">
            <label className="label">Género</label>
            <SelectField
              arrayPlaceholder={["HOMBRE", "MUJER"]}
              name="gender"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Ciudad/Pueblo/Villa</label>
            <TextField
              type="text"
              name="city"
              placeholder="Ciudad/Pueblo/Villa"
              isRequired={false}
            />
          </div>

          <div className="column is-6">
            <label className="label">Departamento</label>
            <TextField
              type="text"
              name="departament"
              placeholder="Departamento"
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
        </div>
      </div>
    </div>
  </div>
);

export default editGeneralInformation;
