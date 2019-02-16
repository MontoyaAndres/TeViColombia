import React from "react";
import { Field } from "formik";

import { TextAreaField } from "../../shared/globalField";
import UploadFile from "./uploadFile";

const InputPortafolio = ({ isSubmitting, values, setFieldValue }) => (
  <div className="box" style={{ marginTop: "0.5rem" }}>
    <label className="label">Descripción.</label>
    <TextAreaField
      name="description"
      placeholder="Describe de qué trata tu proyecto."
      isRequired
    />

    <div className="buttons are-medium">
      <Field
        name="multimedia"
        render={props => (
          <UploadFile
            accept="image/png,image/gif,image/jpeg"
            icon="fa-images"
            {...props}
          />
        )}
      />
      <Field
        name="multimedia"
        render={props => (
          <UploadFile accept="video/mp4" icon="fa-video" {...props} />
        )}
      />
    </div>

    {values.multimedia.length > 0 && (
      <div className="portafolio">
        {values.multimedia.map((file, i) => (
          <div className="portafolio-list" key={i}>
            <button
              type="button"
              className="delete"
              onClick={() =>
                setFieldValue("multimedia", [
                  ...values.multimedia.slice(0, i),
                  ...values.multimedia.slice(i + 1)
                ])
              }
            />

            {file.type.split("/")[0] === "image" && (
              <img src={file.preview} alt="uploaded" />
            )}

            {file.type.split("/")[0] === "video" && (
              <video>
                <source src={file.preview} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
      </div>
    )}

    <button
      type="submit"
      disabled={isSubmitting}
      className={`button is-block is-primary is-large ${
        isSubmitting ? "is-loading" : ""
      }`}
    >
      Enviar
    </button>
  </div>
);

export default InputPortafolio;
