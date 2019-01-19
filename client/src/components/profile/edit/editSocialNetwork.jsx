import React from "react";
import { FieldArray } from "formik";

import { SelectField, TextField } from "../../shared/globalField";

const editSocialNetwork = ({ values }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">Redes sociales</div>
    </div>

    <div className="card-content">
      <div className="content">
        <FieldArray
          name="socialnetwork"
          render={arrayHelpers => (
            <>
              {values.socialnetwork && values.socialnetwork.length > 0 ? (
                <div className="columns is-multiline">
                  {values.socialnetwork.map((sn, index) => (
                    <div className="column is-6" key={index}>
                      <label className="label">Nombre</label>
                      <SelectField
                        arrayPlaceholder={[
                          "Twitter",
                          "Github",
                          "Facebook",
                          "Linkedin",
                          "Instagram",
                          "Youtube",
                          "Spotify",
                          "Whatsapp"
                        ]}
                        name={`socialnetwork.${index}.name`}
                      />

                      <label className="label">URL</label>
                      <div className="control has-icons-right">
                        <TextField
                          type="url"
                          name={`socialnetwork.${index}.url`}
                          placeholder="URL"
                        />

                        <span
                          className="icon is-medium is-right"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <i className="delete is-medium" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="column is-12">
                    <div className="buttons has-addons is-centered">
                      <button
                        type="button"
                        className="button is-primary is-large"
                        onClick={() => arrayHelpers.push({ name: "", url: "" })}
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
                    onClick={() => arrayHelpers.push({ name: "", url: "" })}
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

export default editSocialNetwork;
