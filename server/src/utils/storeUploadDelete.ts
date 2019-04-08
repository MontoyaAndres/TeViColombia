import { createWriteStream, existsSync, mkdirSync, unlinkSync } from "fs";
import { v4 } from "uuid";

const storeUpload = (
  stream: any,
  mimetype: string,
  path: string
): Promise<any> => {
  const extension = () => {
    if (
      mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      if (mimetype === "application/msword") {
        return "doc";
      }
      return "docx";
    } else {
      return mimetype.split("/")[1];
    }
  };

  const fileId = `${v4()}-${Date.now()}.${extension()}`;

  if (!existsSync(path)) {
    mkdirSync(path);
  }

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(`${path}/${fileId}`))
      .on("finish", () => resolve({ fileId }))
      .on("error", reject)
  );
};

const storeDelete = (currentFiles: string[], newFiles: string[] | string) => {
  return new Promise(resolve => {
    // Code by https://bit.ly/2VjG6BA
    const oldFiles = currentFiles.filter(
      value => newFiles.indexOf(value) === -1
    );

    if (oldFiles.length > 0) {
      oldFiles.forEach(file => {
        if (
          file !== "default/default-home.png" &&
          file !== "default/default-photo.png"
        ) {
          try {
            unlinkSync(`${__dirname}/../../public/${file}`);
          } catch (e) {
            // If the file that tries to delete does not exists, only ignore that error
            return;
          }
        }
      });
    }

    resolve(true);
  });
};

export { storeUpload, storeDelete };
