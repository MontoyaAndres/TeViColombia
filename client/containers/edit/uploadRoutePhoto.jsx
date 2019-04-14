import React, { useEffect, memo } from "react";
import { useDropzone } from "react-dropzone";

const uploadRoutePhoto = ({
  field: { value, name },
  form: { values, setFieldValue },
  ...props
}) => {
  const photo = (value ? value.preview : null) || values.routePhoto;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png,image/gif,image/jpeg",
    multiple: false,
    onDrop: ([file]) => {
      setFieldValue(
        name,
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    },
    ...props
  });

  useEffect(() => () => {
    if (Array.isArray(value)) {
      // Make sure to revoke the data uris to avoid memory leaks
      value.forEach(file => URL.revokeObjectURL(file.preview));
    }
  });

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
          <span className="icon is-large overlay-icon" {...getRootProps()}>
            <input {...getInputProps()} />
            <i className="fas fa-5x fa-camera" aria-hidden="true" />
          </span>
        </div>
      </figure>
    </div>
  );
};

export default memo(uploadRoutePhoto);
