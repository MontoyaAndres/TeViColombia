import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

class uploadRouteCover extends PureComponent {
  componentWillUnmount() {
    const {
      field: { value }
    } = this.props;

    if (Array.isArray(value)) {
      // Make sure to revoke the data uris to avoid memory leaks
      value.forEach(file => URL.revokeObjectURL(file.preview));
    }
  }

  onDrop = ([information]) => {
    const {
      field: { name },
      form: { setFieldValue }
    } = this.props;

    setFieldValue(
      name,
      Object.assign(information, {
        preview: URL.createObjectURL(information)
      })
    );
  };

  render() {
    const {
      field: { value },
      ...props
    } = this.props;
    const cover = value ? value.preview : null;

    return (
      <Dropzone
        accept="image/*"
        onDrop={this.onDrop}
        multiple={false}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {cover ? (
              <div className="background-cover background-cover-edit">
                <img
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  src={cover}
                  alt="user cover"
                />
              </div>
            ) : (
              <div className="background-cover background-cover-edit" />
            )}
          </div>
        )}
      </Dropzone>
    );
  }
}

export default uploadRouteCover;
