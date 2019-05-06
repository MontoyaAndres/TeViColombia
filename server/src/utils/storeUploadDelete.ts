import * as cloudinary from "cloudinary";
import { Stream } from "stream";
interface CloudinaryFiles {
  public_id: string;
  resource_type: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (stream: Stream, path: string) => {
  try {
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream(
        {
          folder: path,
          resource_type: "auto" // Being able to upload pdf files
        },
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      stream.pipe(streamLoad);
    });
  } catch (err) {
    throw new Error(`Failed to upload file. Err:${err.message}`);
  }
};

async function storeUpload(
  stream: any,
  path: string
): Promise<{ public_id: string; secure_url: string; resource_type: string }> {
  const { public_id, secure_url, resource_type } = (await cloudinaryUpload(
    stream,
    path
  )) as any;

  return { public_id, secure_url, resource_type };
}

const storeDelete = (
  currentFiles: CloudinaryFiles[],
  newFiles: CloudinaryFiles[]
): Promise<boolean> => {
  return new Promise(resolve => {
    // Code by https://bit.ly/2VjG6BA
    // Get what ids are useless
    const oldFiles = currentFiles.filter(
      file =>
        newFiles.map(item => item.public_id).indexOf(file.public_id) === -1
    );

    if (oldFiles.length > 0) {
      oldFiles.forEach(async ({ public_id, resource_type }) => {
        try {
          await cloudinary.v2.uploader.destroy(public_id, {
            resource_type
          });
        } catch (err) {
          console.error(err);
        }
      });
    }

    resolve(true);
  });
};

export { storeDelete, storeUpload };
