import React, { useEffect, memo } from "react";
import { useDropzone } from "react-dropzone";

const uploadRouteCover = ({
  field: { value, name },
  form: { values, setFieldValue },
  ...props
}) => {
  const cover =
    (value ? value.preview : null) ||
    (values.routeCover ? values.routeCover : null);

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
        <div className="background-color background-color-edit" />
      )}
    </div>
  );
};

export default memo(uploadRouteCover);
