import axios from "axios";

export default class UploadService {
  private static readonly CLOUD_NAME = "dj6rkmgox";
  private static readonly UPLOAD_PRESET = "stwstore";

  static async UploadImage(image: { uri: string; type?: string; fileName?: string }): Promise<string> {
    const formData = new FormData();

    // Cloudinary expects 'file' to be the actual binary
    formData.append("file", {
      uri: image.uri,
      type: image.type || "image/jpeg",
      name: image.fileName || "upload.jpg",
    } as any);

    formData.append("upload_preset", this.UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  }
}
