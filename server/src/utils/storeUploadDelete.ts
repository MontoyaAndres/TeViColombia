import * as cloudinary from "cloudinary";
import { Stream } from "stream";

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
): Promise<{ public_id: string; secure_url: string }> {
  const { public_id, secure_url } = (await cloudinaryUpload(
    stream,
    path
  )) as any;

  return { public_id, secure_url };
}

const storeDelete = (
  currentPublicIds: string[],
  newPublicIds: string[] | string
): Promise<boolean> => {
  return new Promise(resolve => {
    // Code by https://bit.ly/2VjG6BA
    const oldPublicIds = currentPublicIds.filter(
      id => newPublicIds.indexOf(id) === -1
    );

    console.log(oldPublicIds, "old");

    if (oldPublicIds.length > 0) {
      oldPublicIds.forEach(async publicId => {
        await cloudinary.v2.uploader.destroy(publicId);
      });
    }

    resolve(true);
  });
};

export { storeDelete, storeUpload };
