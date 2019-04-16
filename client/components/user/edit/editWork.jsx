import React from "react";
import { FieldArray } from "formik";

import {
  TextField,
  SelectField,
  TextAreaField,
  CheckboxField
} from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";
import Divider from "../../shared/divider";

const editWork = ({ work }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Experiencias profesionales</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="work"
          render={arrayHelpers =>
            work && work.length > 0 ? (
              <>
                {work.map((wrk, index) => (
                  <div className="columns is-multiline" key={index}>
                    <div className="column is-6">
                      <label
                        htmlFor={`work.${index}.company`}
                        className="label"
                      >
                        Empresa
                      </label>
                      <TextField
                        type="text"
                        id={`work.${index}.company`}
                        name={`work.${index}.company`}
                        placeholder="Empresa"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label
                        htmlFor={`work.${index}.departament`}
                        className="label"
                      >
                        Departamento
                      </label>
                      <SelectField
                        id={`work.${index}.departament`}
                        name={`work.${index}.departament`}
                        arrayPlaceholder={EntityGlobalEnum.ENUMDepartament}
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label htmlFor={`work.${index}.sector`} className="label">
                        Sector de la empresa
                      </label>
                      <SelectField
                        id={`work.${index}.sector`}
                        name={`work.${index}.sector`}
                        arrayPlaceholder={EntityGlobalEnum.ENUMSector}
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label htmlFor={`work.${index}.job`} className="label">
                        Cargo
                      </label>
                      <TextField
                        type="text"
                        id={`work.${index}.job`}
                        name={`work.${index}.job`}
                        placeholder="Cargo"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label htmlFor={`work.${index}.area`} className="label">
                        Área
                      </label>
                      <SelectField
                        id={`work.${index}.area`}
                        name={`work.${index}.area`}
                        arrayPlaceholder={EntityGlobalEnum.ENUMArea}
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label
                        htmlFor={`work.${index}.startedOn`}
                        className="label"
                      >
                        Fecha de inicio
                      </label>
                      <TextField
                        type="date"
                        id={`work.${index}.startedOn`}
                        name={`work.${index}.startedOn`}
                        placeholder="Fecha de inicio"
                        isRequired
                      />

                      <CheckboxField
                        name={`work.${index}.workingOn`}
                        message="¿Esta trabajando actualmente?"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label
                        htmlFor={`work.${index}.finishIn`}
                        className="label"
                      >
                        Fecha de finalización
                      </label>
                      <TextField
                        type="date"
                        id={`work.${index}.finishIn`}
                        name={`work.${index}.finishIn`}
                        placeholder="Fecha de finalización"
                        disabled={wrk.workingOn}
                        isRequired={false}
                      />
                    </div>

                    <div className="column is-12">
                      <label className="label">
                        Funciones y logros del cargo
                      </label>
                      <TextAreaField
                        name={`work.${index}.goals`}
                        placeholder="Funciones y logros del cargo"
                        isRequired={false}
                      />
                    </div>

                    <div className="column is-12">
                      <div className="buttons has-addons is-centered">
                        <button
                          type="button"
                          className="button is-danger is-large"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <i className="fas fa-lg fa-trash-alt" />
                        </button>
                      </div>

                      {work.length - 1 !== index && <Divider />}
                    </div>
                  </div>
                ))}

                <div className="column is-12">
                  <div className="buttons has-addons is-centered">
                    <button
                      type="button"
                      className="button is-primary is-large"
                      onClick={() =>
                        arrayHelpers.push({
                          company: "",
                          departament: "Bogotá, D.C.",
                          sector: "Agricultura / Pesca / Ganadería",
                          job: "",
                          area: "Administración / Oficina",
                          startedOn: "",
                          finishIn: "",
                          goals: ""
                        })
                      }
                      style={{ width: 200 }}
                    >
                      <i className="fas fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="buttons has-addons is-centered">
                <button
                  type="button"
                  className="button is-primary is-large"
                  onClick={() =>
                    arrayHelpers.push({
                      company: "",
                      departament: "Bogotá, D.C.",
                      sector: "Agricultura / Pesca / Ganadería",
                      job: "",
                      area: "Administración / Oficina",
                      startedOn: "",
                      finishIn: "",
                      goals: ""
                    })
                  }
                  style={{ width: 200 }}
                >
                  <i className="fas fa-plus" aria-hidden="true" />
                </button>
              </div>
            )
          }
        />
      </div>
    </div>
  </div>
);

export default editWork;
