import React from "react";
import { Field, ErrorMessage } from "formik";
import CountryJSON from "../../static/countries.json";

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

const SelectMultipleField = ({
  name,
  arrayPlaceholder,
  isRequired,
  setFieldValue,
  ...props
}) => (
  <>
    <div className="field">
      <div className="control">
        <div className="select is-fullwidth is-multiple">
          <Field
            {...props}
            component="select"
            name={name}
            required={isRequired}
            className="is-hovered"
            multiple
            onChange={evt =>
              setFieldValue(
                name,
                [].slice
                  .call(evt.target.selectedOptions)
                  .map(option => option.value)
              )
            }
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

const TextAreaField = ({
  name,
  placeholder,
  isRequired = true,
  maxLength,
  ...props
}) => (
  <>
    <div className="field">
      <div className="control">
        <Field
          {...props}
          name={name}
          render={({ field }) => (
            <textarea
              {...field}
              maxLength={maxLength}
              placeholder={placeholder}
              required={isRequired}
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

const CheckboxField = ({ name, isRequired = true, message, ...props }) => (
  <label className="checkbox">
    <Field
      {...props}
      name={name}
      required={isRequired}
      render={({ field }) => (
        <>
          <input {...field} type="checkbox" checked={field.value} /> {message}
        </>
      )}
    />
  </label>
);

const TextFieldAddonsCountry = ({
  type,
  name,
  selectName,
  placeholder,
  isRequired = true,
  ...props
}) => (
  <>
    <div className="field has-addons">
      <div className="control">
        <span className="select">
          <Field
            {...props}
            component="select"
            name={selectName}
            required={isRequired}
            className="is-hovered"
          >
            {CountryJSON.map((item, i) => (
              <option key={i} value={item.phone}>
                {item.emoji + " " + item.phone}
              </option>
            ))}
          </Field>
        </span>
      </div>

      <div className="control is-expanded">
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

const RadioField = ({ name, arrayRadio, isRequired = true, ...props }) => (
  <div className="control">
    {arrayRadio.map(radio => (
      <label className="radio" key={radio}>
        <Field
          {...props}
          name={name}
          required={isRequired}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="radio"
                value={radio}
                checked={field.value === radio}
              />{" "}
              {radio}
            </>
          )}
        />
      </label>
    ))}
  </div>
);

export {
  TextField,
  SelectField,
  SelectMultipleField,
  TextAreaField,
  CheckboxField,
  TextFieldAddonsCountry,
  RadioField
};
