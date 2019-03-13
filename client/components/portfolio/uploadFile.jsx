import React from "react";
import { useDropzone } from "react-dropzone";

const uploadFile = ({
  accept,
  icon,
  field: { name },
  form: { setFieldValue, values },
  ...props
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: files => {
      // This is to freeze the `file` array, and may concat it with the `values.multimedia` objects.
      const assignFile = files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFieldValue(name, assignFile.concat(values.multimedia));
    },
    ...props
  });

  return (
    <a className="button" {...getRootProps()}>
      <input {...getInputProps()} />
      <i className={`fas ${icon}`} aria-hidden="true" />
    </a>
  );
};

export default uploadFile;
