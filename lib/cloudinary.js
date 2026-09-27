import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "hehl57yx",
  api_key: process.env.CLOUDINARY_API_KEY || "116892498216864",
  api_secret: process.env.CLOUDINARY_API_SECRET || "HQGCGxDUtjkwkmOnsHclFvzA-Qs",
  secure: true,
});

export default cloudinary;
