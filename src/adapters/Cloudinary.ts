import { cloudinary } from "../infra/cloudinaryConfig";

class Cloudinary {

  async upload(buffer: Buffer, folder: string) {
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });
    return uploadResult;
  }

  async delete(publicId: string) {
    const deleteResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, { invalidate: true },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
    });
    return deleteResult;
  }

}

export { Cloudinary }

