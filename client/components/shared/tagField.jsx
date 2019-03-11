import React, { useState } from "react";

const tagField = ({ name, placeholder, values, setFieldValue }) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    e.preventDefault();

    setValue(e.target.value);
  }

  function handleDeleteElement(index) {
    setFieldValue(name, [
      ...values.slice(0, index),
      ...values.slice(index + 1)
    ]);
  }

  function handleAddElement(e) {
    e.preventDefault();

    if (value !== "") {
      setFieldValue(name, [...values, value]);
    }
    setValue("");
  }

  return (
    <>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <input
            type="text"
            value={value}
            onKeyPress={e => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onChange={handleChange}
            className="input is-hovered is-medium"
            name={name}
            placeholder={placeholder}
          />
        </div>

        <div className="control">
          <a className="button is-info is-medium" onClick={handleAddElement}>
            <span className="icon">
              <i className="fas fa-plus" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      {values && values.length > 0
        ? values.map((val, i) => (
            <span
              key={i}
              className="tag is-info is-large"
              style={{ margin: 5 }}
            >
              {val}
              <button
                type="button"
                className="delete"
                onClick={() => handleDeleteElement(i)}
              />
            </span>
          ))
        : null}
    </>
  );
};

export default tagField;
