import React from "react";
import { useDropzone } from "react-dropzone";

const editCV = ({
  field: { name },
  form: { setFieldValue, values },
  ...props
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".doc,.docx,.pdf",
    onDrop: files => {
      // This is to freeze the `file` array, and may concat it with the `values.cv` objects.
      const assignFile = files.map(file => Object.assign(file));
      setFieldValue(name, assignFile.concat(values.cv));
    },
    ...props
  });

  function handleDeleteFile(index) {
    setFieldValue(name, [
      ...values.cv.slice(0, index),
      ...values.cv.slice(index + 1)
    ]);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Anexos</div>
      </div>

      <div className="card-content">
        <div className="content">
          <div
            {...getRootProps()}
            style={{
              marginTop: 20,
              border: "4px dashed #00d1b2",
              position: "relative",
              backgroundColor: isDragActive ? "rgba(0, 209, 178, 0.2)" : "white"
            }}
          >
            <div
              style={{
                fontWeight: 100,
                textTransform: "uppercase",
                color: "#00d1b2",
                padding: 60,
                textAlign: "center"
              }}
            >
              <input {...getInputProps()} />
              <h3 className="h3">Subir Anexo en PDF o Word</h3>
            </div>
          </div>

          {values.cv && values.cv.length > 0 ? (
            <div className="columns is-multiline">
              {values.cv.map((CVFile, i) => (
                <div className="column is-6" key={i}>
                  <div style={{ marginTop: "0.5rem" }}>
                    <div className="card" style={{ borderRadius: 6 }}>
                      <div className="card-header" style={{ borderRadius: 6 }}>
                        <div className="card-header-title">
                          <div className="media">
                            <div className="media-left">
                              <i
                                className="fas fa-2x fa-file-download"
                                style={{ color: "#209cee" }}
                                aria-hidden="true"
                              />
                            </div>
                            <div className="media-content">
                              <span className="subtitle">
                                {CVFile.filename || CVFile.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="card-header-icon">
                          <span
                            className="delete"
                            onClick={() => handleDeleteFile(i)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default editCV;
