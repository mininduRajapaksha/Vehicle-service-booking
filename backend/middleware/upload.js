import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "vehicle-services",

    format: async (req, file) => {
      return "jpg";
    },

    public_id: (req, file) =>
      `service_${Date.now()}`
  },
});

const upload = multer({
  storage,
});

export default upload;