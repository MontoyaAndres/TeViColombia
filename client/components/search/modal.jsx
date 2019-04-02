import React, { useState } from "react";

import useResize from "../shared/useResize";
import { SelectField, RadioField } from "../shared/globalField";
import EntityGlobalEnum from "../../utils/entityGlobalEnum";
import TownsByDepartament from "../../utils/townsByDepartament";

const DesktopParams = ({ values, width }) => (
  <div className={width > 769 ? "box" : "box-mobile"} style={{ marginTop: 0 }}>
    <div className="content">
      <h4 className="title is-5">Parametros de busqueda</h4>

      <div className="field">
        <label className="label">Tipo de cuentas a buscar</label>
        <RadioField
          name="type"
          arrayRadio={["Usuario", "Empresa"]}
          isRequired
        />
      </div>

      <label className="label">País</label>
      <SelectField
        name="nationality"
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
      values.nationality === "Colombia" ? (
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

      {values.type === "Usuario" && (
        <>
          <label className="label">¿Filtrar por necesidad?</label>
          <SelectField
            name="necessity"
            arrayPlaceholder={["Sí", "No"]}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && (
        <>
          <label className="label">Sector de la empresa</label>
          <SelectField
            name="sector"
            arrayPlaceholder={EntityGlobalEnum.ENUMSector}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && (
        <>
          <label className="label">Área</label>
          <SelectField
            name="area"
            arrayPlaceholder={EntityGlobalEnum.ENUMArea}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && (
        <>
          <label className="label">¿Filtrar por empleo?</label>
          <SelectField
            name="employ"
            arrayPlaceholder={["Sí", "No"]}
            isRequired
          />
        </>
      )}
    </div>
  </div>
);

const MobileParams = ({ values }) => {
  const [hidden, setHidden] = useState(false);

  function HiddenModalParams() {
    return (
      <div className={hidden ? "modal is-active" : ""}>
        <DesktopParams values={values} />
        <span
          className="modal-close icon is-medium"
          onClick={() => setHidden(false)}
        >
          <i className="delete is-medium" aria-hidden="true" />
        </span>
      </div>
    );
  }

  return (
    <>
      {hidden && <HiddenModalParams />}
      <a className="params-button" onClick={() => setHidden(true)}>
        <i className="fa fa-ellipsis-v" />
      </a>
    </>
  );
};

const ModalParams = ({ values }) => {
  const { width } = useResize();

  return width < 769 ? (
    <MobileParams values={values} />
  ) : (
    <DesktopParams values={values} width={width} />
  );
};

export default ModalParams;
