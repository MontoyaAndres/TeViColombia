import React from "react";
import Dropzone from "react-dropzone";

const uploadFile = ({
  accept,
  icon,
  field: { name },
  form: { setFieldValue, values },
  ...props
}) => (
  <Dropzone
    accept={accept}
    onDrop={files => {
      // This is to freeze the `file` array, and may concat it with the `values.multimedia` objects.
      const assignFile = files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFieldValue(name, assignFile.concat(values.multimedia));
    }}
    {...props}
  >
    {({ getRootProps, getInputProps }) => (
      <a className="button" {...getRootProps()}>
        <input {...getInputProps()} />
        <i className={`fas ${icon}`} aria-hidden="true" />
      </a>
    )}
  </Dropzone>
);

export default uploadFile;
