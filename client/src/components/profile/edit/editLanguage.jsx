import React, { Fragment } from "react";
import { FieldArray } from "formik";

import { TextField } from "../../shared/globalField";

const editLanguage = ({ values }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Idiomas</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="language"
          render={arrayHelpers => (
            <>
              {values.language && values.language.length > 0 ? (
                <div className="columns is-multiline">
                  {values.language.map((lang, index) => (
                    <Fragment key={index}>
                      <div className="column is-6">
                        <label className="label">Idioma</label>
                        <TextField
                          type="text"
                          name={`language.${index}.language`}
                          placeholder="Idioma"
                        />

                        <label className="label">Nivel de idioma</label>
                        <div className="control has-icons-right">
                          <TextField
                            type="text"
                            name={`language.${index}.level`}
                            placeholder="Nivel de idioma"
                          />

                          <span
                            className="icon is-medium is-right"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <i
                              className="delete is-medium"
                              aria-hidden="true"
                            />
                          </span>
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
                          arrayHelpers.push({ language: "", level: "" })
                        }
                        style={{ width: 200 }}
                      >
                        <i className="fas fa-plus" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="buttons has-addons is-centered">
                  <button
                    type="button"
                    className="button is-primary is-large"
                    onClick={() =>
                      arrayHelpers.push({ language: "", level: "" })
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

export default editLanguage;
