import React, { useState, memo } from "react";

import useResize from "../shared/useResize";
import { SelectField, RadioField } from "../shared/globalField";
import EntityGlobalEnum from "../../utils/entityGlobalEnum";
import TownsByDepartament from "../../utils/townsByDepartament";

const DesktopParams = ({ values, width }) => (
  <div className={width > 769 ? "box" : "box-mobile"} style={{ marginTop: 0 }}>
    <div className="content">
      <h4 className="title is-5">Parametros de busqueda</h4>

      <div className="field">
        <label htmlFor="type" className="label">
          Tipo de cuentas a buscar
        </label>
        <RadioField
          name="type"
          id="type"
          arrayRadio={["Usuario", "Empresa"]}
          isRequired
        />
      </div>

      <label htmlFor="nationality" className="label">
        País
      </label>
      <SelectField
        name="nationality"
        id="nationality"
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
      values.nationality === "Colombia" ? (
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

      {values.type === "Usuario" && (
        <>
          <label htmlFor="necessity" className="label">
            ¿Filtrar por necesidad?
          </label>
          <SelectField
            name="necessity"
            id="necessity"
            arrayPlaceholder={["Sí", "No"]}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && (
        <>
          <label htmlFor="sector" className="label">
            Sector de la empresa
          </label>
          <SelectField
            name="sector"
            id="sector"
            arrayPlaceholder={EntityGlobalEnum.ENUMSector}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && (
        <>
          <label htmlFor="employ" className="label">
            ¿Filtrar por empleo?
          </label>
          <SelectField
            name="employ"
            id="employ"
            arrayPlaceholder={["Sí", "No"]}
            isRequired
          />
        </>
      )}

      {values.type === "Empresa" && values.employ === "Sí" ? (
        <>
          <label htmlFor="area" className="label">
            Área
          </label>
          <SelectField
            name="area"
            id="area"
            arrayPlaceholder={EntityGlobalEnum.ENUMArea}
            isRequired
          />
        </>
      ) : null}
    </div>
  </div>
);

const MobileParams = ({ values }) => {
  const [hidden, setHidden] = useState(false);

  function HiddenModalParams() {
    return (
      <>
        {/* remove scroll from body. https://stackoverflow.com/a/24727206 */}
        <style global jsx>{`
          html,
          body {
            overflow: hidden;
            position: fixed;
          }
        `}</style>

        <div className={hidden ? "modal is-active" : ""}>
          <DesktopParams values={values} />
          <span
            className="modal-close icon is-medium"
            onClick={() => setHidden(false)}
          >
            <i className="delete is-medium" aria-hidden="true" />
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      {hidden && <HiddenModalParams />}
      <a
        type="button"
        className="params-button"
        onClick={() => setHidden(true)}
      >
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

export default memo(ModalParams);
