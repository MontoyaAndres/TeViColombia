import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

class uploadRoutePhoto extends PureComponent {
  componentWillUnmount() {
    const {
      field: { value }
    } = this.props;

    if (Array.isArray(value)) {
      // Make sure to revoke the data uris to avoid memory leaks
      value.forEach(file => URL.revokeObjectURL(file.preview));
    }
  }

  onDrop = ([file]) => {
    const {
      field: { name },
      form: { setFieldValue }
    } = this.props;

    setFieldValue(
      name,
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
  };

  render() {
    const {
      field: { value },
      form: { values },
      ...props
    } = this.props;
    const photo =
      (value ? value.preview : null) ||
      `http://localhost:4000/${values.routePhoto}`;

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
          <Dropzone
            accept="image/*"
            onDrop={this.onDrop}
            multiple={false}
            {...props}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div style={{ textAlign: "center" }}>
                <img
                  style={{
                    width: 200,
                    height: 200,
                    opacity: isDragActive ? 0.5 : 1
                  }}
                  src={photo}
                  alt="profile"
                />
                <span
                  className="icon is-large overlay-icon"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
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
