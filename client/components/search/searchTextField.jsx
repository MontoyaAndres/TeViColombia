import React from "react";
import { Field } from "formik";

import useResize from "../shared/useResize";

const searchTextField = ({ name, placeholder, handleSubmit, ...props }) => {
  const { width } = useResize();

  return (
    <>
      <label className="label">Busca lo que tú necesitas!</label>
      <div className="field has-addons animated fadeIn">
        <div className="control is-expanded">
          <Field
            {...props}
            type="search"
            className="input is-hovered is-medium"
            name={name}
            placeholder={placeholder}
            required
          />
        </div>
        <div className="control">
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="button is-primary is-medium"
            style={{
              WebkitBoxShadow: "0 0 0 1px rgba(10, 10, 10, 0.5)",
              boxShadow: "0 0 0 1px rgba(10, 10, 10, 0.5)"
            }}
          >
            {width < 600 ? (
              <span className="icon">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            ) : (
              "Buscar"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default searchTextField;
