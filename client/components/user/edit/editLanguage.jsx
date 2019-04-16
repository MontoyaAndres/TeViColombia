import React from "react";
import { FieldArray } from "formik";

import { SelectField } from "../../shared/globalField";
import EntityGlobalEnum from "../../../utils/entityGlobalEnum";

const editLanguage = ({ language }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Idiomas</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="language"
          render={arrayHelpers =>
            language && language.length > 0 ? (
              <div className="columns is-multiline">
                {language.map((_, index) => (
                  <div className="column is-6" key={index}>
                    <label
                      htmlFor={`language.${index}.level`}
                      className="label"
                    >
                      Nivel de idioma
                    </label>
                    <SelectField
                      id={`language.${index}.level`}
                      name={`language.${index}.level`}
                      arrayPlaceholder={EntityGlobalEnum.ENUMLanguageLevel}
                      isRequired
                    />

                    <label
                      htmlFor={`language.${index}.language`}
                      className="label"
                    >
                      Idioma
                    </label>
                    <SelectField
                      id={`language.${index}.language`}
                      name={`language.${index}.language`}
                      arrayPlaceholder={EntityGlobalEnum.ENUMLanguage}
                      isRequired
                    />

                    <div className="field is-grouped is-grouped-centered">
                      <div className="control">
                        <button
                          type="button"
                          className="button is-danger"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <span className="icon is-large">
                            <i
                              className="fas fa-lg fa-trash-alt"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </div>
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
                          language: "Español",
                          level: "Muy básico"
                        })
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
                    arrayHelpers.push({
                      language: "Español",
                      level: "Muy básico"
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

export default editLanguage;
