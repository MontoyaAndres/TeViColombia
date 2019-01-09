import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

class uploadRoutePhoto extends PureComponent {
  state = {
    files: []
  };

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  onDrop = information => {
    const { setFieldValue } = this.props;

    this.setState({
      files: information.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });

    setFieldValue("routePhoto", information);
  };

  render() {
    const { data } = this.props;
    const { files } = this.state;
    const previewPhoto = `http://localhost:4000/${data.information.routePhoto}`;

    return (
      <div
        style={{
          display: "block",
          position: "relative",
          width: 200,
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <figure className="avatar-profile">
          <Dropzone accept="image/*" onDrop={this.onDrop} multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div style={{ textAlign: "center" }}>
                <input {...getInputProps()} />
                {files.length ? (
                  files.map((file, i) => (
                    <img
                      key={i}
                      style={{
                        width: 200,
                        height: 200,
                        opacity: isDragActive ? 0.5 : 1
                      }}
                      src={file.preview}
                      alt="profile"
                    />
                  ))
                ) : (
                  <img
                    style={{
                      width: 200,
                      height: 200,
                      opacity: isDragActive ? 0.5 : 1
                    }}
                    src={previewPhoto}
                    alt="profile"
                  />
                )}
                <span
                  className="icon is-large overlay-icon"
                  {...getRootProps()}
                >
                  <i className="fas fa-5x fa-camera" aria-hidden="true" />
                </span>
              </div>
            )}
          </Dropzone>
        </figure>
      </div>
    );
  }
}

export default uploadRoutePhoto;
