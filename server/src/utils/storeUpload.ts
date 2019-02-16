import { createWriteStream, existsSync, mkdirSync } from "fs";
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

export default storeUpload;
