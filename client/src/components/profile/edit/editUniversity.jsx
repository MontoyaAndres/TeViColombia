import React, { Fragment } from "react";
import { FieldArray } from "formik";

import {
  TextField,
  CheckboxField,
  SelectField,
  TextAreaField
} from "../../shared/globalField";

const editUniversity = ({ values, setFieldValue }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Universidad</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="university"
          render={arrayHelpers => (
            <>
              {values.university && values.university.length > 0 ? (
                <>
                  {values.university.map((uni, index) => (
                    <Fragment key={index}>
                      <div className="columns is-multiline">
                        <div className="column is-6">
                          <label className="label">Lugar de estudio</label>
                          <TextField
                            type="text"
                            name={`university.${index}.place`}
                            placeholder="Lugar de estudio"
                          />
                        </div>

                        <div className="column is-6">
                          <label className="label">Fecha de inicio</label>
                          <TextField
                            type="date"
                            name={`university.${index}.startedOn`}
                            placeholder="Fecha de inicio"
                          />
                        </div>

                        <div className="column is-6">
                          <label className="label">Fecha de finalización</label>
                          <TextField
                            type="date"
                            name={`university.${index}.finishIn`}
                            placeholder="Fecha de finalización"
                            isRequired={false}
                          />
                          <CheckboxField
                            name={`university.${index}.finished`}
                            message=" ¿Ha finalizado la carrera?"
                            isRequired={false}
                          />
                        </div>

                        <div className="column is-6">
                          <label className="label">Especializaciones</label>
                          <TextField
                            type="text"
                            name={`university.${index}.especializations`}
                            placeholder="Añade una coma por cada nueva especialización"
                          />
                        </div>

                        <div className="column is-6">
                          <label className="label">Asistió a</label>
                          <SelectField
                            arrayPlaceholder={[
                              "UNIVERSIDAD",
                              "CENTRO DE ESTUDIOS DE POSGRADO"
                            ]}
                            name={`university.${index}.attended`}
                          />
                        </div>

                        <div className="column is-12">
                          <label className="label">Descripción</label>
                          <TextAreaField
                            name={`university.${index}.description`}
                            placeholder="Descripción"
                          />

                          <div className="buttons has-addons is-centered">
                            <button
                              type="button"
                              className="button is-danger is-large is-rounded"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}

                  <div className="column is-12">
                    <div className="buttons has-addons is-centered">
                      <button
                        type="button"
                        className="button is-primary is-large"
                        onClick={() =>
                          arrayHelpers.push({
                            place: "",
                            startedOn: "",
                            finishIn: "",
                            finished: false,
                            especializations: "",
                            attended: "UNIVERSIDAD",
                            description: ""
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
                        startedOn: "",
                        finishIn: "",
                        finished: false,
                        especializations: "",
                        attended: "UNIVERSIDAD",
                        description: ""
                      })
                    }
                    style={{ width: 200 }}
                  >
                    <i className="fas fa-plus" aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  </div>
);

export default editUniversity;
