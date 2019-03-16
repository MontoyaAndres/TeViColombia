import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const uploadRouteCover = ({
  field: { value, name },
  form: { values, setFieldValue },
  ...props
}) => {
  const cover =
    (value ? value.preview : null) ||
    (values.routeCover ? `${process.env.API_HOST}/${values.routeCover}` : null);

  const { getRootProps, getInputProps } = useDropzone({
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {cover ? (
        <div className="background-cover background-cover-edit">
          <img src={cover} alt="user cover" />
        </div>
      ) : (
        <div
          className="background-cover-edit"
          style={{ height: 400, width: "100%", backgroundColor: "#00ffd9" }}
        />
      )}
    </div>
  );
};

export default uploadRouteCover;
