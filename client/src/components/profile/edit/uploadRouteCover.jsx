import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

class uploadRouteCover extends PureComponent {
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

    setFieldValue("routeCover", information);
  };

  render() {
    const { data } = this.props;
    const { files } = this.state;
    const previewPhoto = `http://localhost:4000/${data.information.routeCover}`;

    return (
      <Dropzone accept="image/*" onDrop={this.onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="background-cover">
            <input {...getInputProps()} />

            {data.information.routeCover || files.length ? (
              <>
                {files.length ? (
                  files.map((file, i) => (
                    <img
                      key={i}
                      alt="user cover"
                      src={file.preview}
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                    />
                  ))
                ) : (
                  <img
                    alt="user cover"
                    src={previewPhoto}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                  />
                )}
              </>
            ) : null}
          </div>
        )}
      </Dropzone>
    );
  }
}

export default uploadRouteCover;
