import React from "react";
import { FieldArray } from "formik";

import {
  TextField,
  SelectField,
  CheckboxField
} from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";
import Divider from "../../shared/divider";

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
                      <label htmlFor={`study.${index}.place`} className="label">
                        Centro educativo
                      </label>
                      <TextField
                        type="text"
                        id={`study.${index}.place`}
                        name={`study.${index}.place`}
                        placeholder="Lugar de estudio"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label htmlFor={`study.${index}.level`} className="label">
                        Nivel de estudios
                      </label>
                      <SelectField
                        id={`study.${index}.level`}
                        name={`study.${index}.level`}
                        arrayPlaceholder={EntityGlobalEnum.ENUMStudyLevel}
                        isRequired
                      />
                    </div>

                    {stdy.level !== "EDUCACIÓN BÁSICA PRIMARIA" &&
                    stdy.level !== "EDUCACIÓN BÁSICA SECUNDARIA" &&
                    stdy.level !== "BACHILLERATO / EDUCACIÓN MEDIA" ? (
                      <div className="column is-6">
                        <label
                          htmlFor={`study.${index}.area`}
                          className="label"
                        >
                          Área de estudio
                        </label>
                        <TextField
                          type="text"
                          id={`study.${index}.area`}
                          name={`study.${index}.area`}
                          placeholder="Lugar de estudio"
                          isRequired
                        />
                      </div>
                    ) : null}

                    <div className="column is-6">
                      <label
                        htmlFor={`study.${index}.startedOn`}
                        className="label"
                      >
                        Fecha de inicio
                      </label>
                      <TextField
                        type="date"
                        id={`study.${index}.startedOn`}
                        name={`study.${index}.startedOn`}
                        placeholder="Fecha de inicio"
                        isRequired
                      />

                      <CheckboxField
                        name={`study.${index}.studyingOn`}
                        message="¿Esta estudianto actualmente?"
                        isRequired
                      />
                    </div>

                    <div className="column is-6">
                      <label
                        htmlFor={`study.${index}.finishIn`}
                        className="label"
                      >
                        Fecha de finalización
                      </label>
                      <TextField
                        type="date"
                        id={`study.${index}.finishIn`}
                        name={`study.${index}.finishIn`}
                        placeholder="Fecha de finalización"
                        disabled={stdy.studyingOn}
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

                      {study.length - 1 !== index && <Divider />}
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
