import React from "react";
import { Field, ErrorMessage } from "formik";

const TextField = ({
  type,
  name,
  placeholder,
  isRequired = true,
  ...props
}) => (
  <>
    <div className="field">
      <div className="control">
        <Field
          {...props}
          className="input is-hovered"
          type={type}
          name={name}
          placeholder={placeholder}
          required={isRequired}
        />
      </div>
    </div>

    <div className="error">
      <ErrorMessage name={name} />
    </div>
  </>
);

const SelectField = ({ name, arrayPlaceholder, isRequired, ...props }) => (
  <>
    <div className="field">
      <div className="control">
        <div className="select is-fullwidth">
          <Field
            {...props}
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

    <div className="error">
      <ErrorMessage name={name} />
    </div>
  </>
);

const TextAreaField = ({ name, placeholder, isRequired = true, ...props }) => (
  <>
    <div className="field">
      <div className="control">
        <Field
          {...props}
          name={name}
          required={isRequired}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder={placeholder}
              className="textarea"
            />
          )}
        />
      </div>
    </div>

    <div className="error">
      <ErrorMessage name={name} />
    </div>
  </>
);

export { TextField, SelectField, TextAreaField };
