import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "vehicle-services",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp"
    ],

    public_id: `${Date.now()}`
  }),
});

<<<<<<< HEAD
//middleware
const upload = multer({storage });
=======
const upload = multer({
  storage,
});
>>>>>>> 5d0511083d1f35ed61c4fcee567a3d91a9c6a734

export default upload;
