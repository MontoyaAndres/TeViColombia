import React from "react";

const TextField = ({ type, name, placeholder, isRequired = true }) => (
  <div className="field">
    <div className="control">
      <input
        className="input is-hovered"
        type={type}
        name={name}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  </div>
);

const SelectField = ({ name, arrayPlaceholder, isRequired }) => (
  <div className="field">
    <div className="control">
      <div className="select is-fullwidth">
        <select name={name} required={isRequired} className="is-hovered">
          {arrayPlaceholder.map((placeholder, index) => (
            <option key={index}>{placeholder}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export { TextField, SelectField };
