import React from "react";
import { Field, ErrorMessage } from "formik";

import { TextAreaField } from "../shared/globalField";
import UploadFile from "./uploadFile";

const InputPortfolio = ({ values, setFieldValue, ...rest }) => (
  <>
    <label className="label">Descripción.</label>
    <TextAreaField
      name="description"
      placeholder="Describe de qué trata tu proyecto."
      isRequired
      {...rest}
    />

    <div className="buttons are-medium" style={{ marginBottom: 0 }}>
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

    <div className="error">
      <ErrorMessage name="multimedia" />
    </div>

    {values.multimedia.length > 0 && (
      <div className="portfolio">
        {values.multimedia.map((file, i) => (
          <div className="portfolio-list" key={i}>
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

            {/* If `type` exists is because the user wants to insert a new file, if not, the user wants to edit it */}
            {file.type ? (
              file.type.split("/")[0] === "image" ? (
                <img src={file.preview} alt="uploaded" />
              ) : (
                <video>
                  <source src={file.preview} type="video/mp4" />
                </video>
              )
            ) : file.split(".").pop() !== "mp4" ? (
              <img src={`${process.env.API_HOST}/${file}`} alt="uploaded" />
            ) : (
              <video>
                <source
                  src={`${process.env.API_HOST}/${file}`}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        ))}
      </div>
    )}
  </>
);

export default InputPortfolio;
