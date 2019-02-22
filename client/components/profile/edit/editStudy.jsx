import React from "react";
import { FieldArray } from "formik";

import { TextField, SelectField } from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";

const editStudy = ({ study }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Estudio</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="study"
          render={arrayHelpers =>
            study && study.length > 0 ? (
              <>
                {study.map((stdy, index) => (
                  <div className="columns is-multiline" key={index}>
                    <div className="column is-6">
                      <label className="label">Centro educativo</label>
                      <TextField
                        type="text"
                        name={`study.${index}.place`}
                        placeholder="Lugar de estudio"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label className="label">Nivel de estudios</label>
                      <SelectField
                        name={`study.${index}.level`}
                        arrayPlaceholder={EntityGlobalEnum.ENUMStudyLevel}
                        isRequired
                      />
                    </div>

                    {stdy.level !== "EDUCACIÓN BÁSICA PRIMARIA" &&
                    stdy.level !== "EDUCACIÓN BÁSICA SECUNDARIA" &&
                    stdy.level !== "BACHILLERATO / EDUCACIÓN MEDIA" ? (
                      <div className="column is-6">
                        <label className="label">Área de estudio</label>
                        <TextField
                          type="text"
                          name={`study.${index}.area`}
                          placeholder="Lugar de estudio"
                          isRequired
                        />
                      </div>
                    ) : null}

                    <div className="column is-6">
                      <label className="label">Fecha de inicio</label>
                      <TextField
                        type="date"
                        name={`study.${index}.startedOn`}
                        placeholder="Fecha de inicio"
                        isRequired
                      />
                    </div>

                    {stdy.startedOn !== "" && (
                      <div className="column is-6">
                        <label className="label">Fecha de finalización</label>
                        <TextField
                          type="date"
                          name={`study.${index}.finishIn`}
                          placeholder="Fecha de finalización"
                          isRequired={false}
                        />
                      </div>
                    )}

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

                      {study.length - 1 !== index && (
                        <div className="is-divider" style={{ width: "100%" }} />
                      )}
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
                          place: "",
                          level: "EDUCACIÓN BÁSICA PRIMARIA",
                          area: "",
                          startedOn: "",
                          finishIn: ""
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
                      place: "",
                      level: "EDUCACIÓN BÁSICA PRIMARIA",
                      area: "",
                      startedOn: "",
                      finishIn: ""
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

export default editStudy;
