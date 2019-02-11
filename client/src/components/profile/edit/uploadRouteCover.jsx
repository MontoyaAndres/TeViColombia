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
      form: { values },
      ...props
    } = this.props;
    const cover =
      (value ? value.preview : null) ||
      (values.routeCover
        ? `${process.env.API_HOST}/${values.routeCover}`
        : null);

    return (
      <Dropzone
        accept="image/png,image/gif,image/jpeg"
        onDrop={this.onDrop}
        multiple={false}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {cover ? (
              <div className="background-cover background-cover-edit">
                <img src={cover} alt="user cover" />
              </div>
            ) : (
              <div
                className="background-cover background-cover-edit"
                style={{ height: 450, width: "100%" }}
              />
            )}
          </div>
        )}
      </Dropzone>
    );
  }
}

export default uploadRouteCover;
