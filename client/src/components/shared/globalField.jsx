import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";

const TextField = ({ type, name, placeholder, isRequired = true }) => (
  <Fragment>
    <div className="field">
      <div className="control">
        <Field
          className="input is-hovered"
          type={type}
          name={name}
          placeholder={placeholder}
          required={isRequired}
        />
      </div>
    </div>

    <div style={{ color: "red", fontWeight: 14, paddingBottom: "0.5em" }}>
      <ErrorMessage name={name} />
    </div>
  </Fragment>
);

const SelectField = ({ name, arrayPlaceholder, isRequired }) => (
  <Fragment>
    <div className="field">
      <div className="control">
        <div className="select is-fullwidth">
          <Field
            component="select"
            name={name}
            required={isRequired}
            className="is-hovered"
          >
            {arrayPlaceholder.map((placeholder, index) => (
              <option key={index} value={placeholder}>
                {placeholder}
              </option>
            ))}
          </Field>
        </div>
      </div>
    </div>

    <div style={{ color: "red", fontWeight: 14, paddingBottom: "0.5em" }}>
      <ErrorMessage name={name} />
    </div>
  </Fragment>
);

export { TextField, SelectField };
