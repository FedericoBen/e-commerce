"use server";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteImageCloudinary = async (imageURl: string) => {

  if (!imageURl.startsWith("http"))
    return {
      ok: false,
      message: "The images of file system can´t be deleted",
    };

  const imageName = imageURl.split("/").pop()?.split(".")?.[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    return {
      ok: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "The image can´t be deleted",
    };
  }
};