import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

// TODO: Subir CV con un modal, cuando la suba, enviarla al backend y al terminal la respuesta, mostrar lista de CV

class editCV extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { CVFiles } = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">Hoja de vida</div>
        </div>

        <div className="card-content">
          <div className="content">
            <Dropzone accept=".pdf, .doc, .docx" onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  style={{
                    marginTop: 20,
                    border: "4px dashed #00d1b2",
                    position: "relative",
                    backgroundColor: isDragActive
                      ? "rgba(0, 209, 178, 0.2)"
                      : "white"
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
                    <h3 className="h3">Subir hoja de vida en PDF o Word</h3>
                  </div>
                </div>
              )}
            </Dropzone>

            {CVFiles && CVFiles.length ? (
              <div className="columns is-multiline">
                {CVFiles.map((CVFile, i) => (
                  <div className="column is-6" key={i}>
                    <div style={{ marginTop: "0.5rem" }}>
                      <div className="card" style={{ borderRadius: 6 }}>
                        <div
                          className="card-header"
                          style={{ borderRadius: 6 }}
                        >
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
                                  {CVFile.routeCV}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="card-header-icon">
                            <span
                              className="delete"
                              onClick={() => this.handleDeleteFile(i)}
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
  }
}

export default editCV;
