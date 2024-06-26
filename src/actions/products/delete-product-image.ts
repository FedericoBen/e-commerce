"use server";

import { ROUTES } from "@/common/routes";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteImage = async (imageId: string, imageURl: string) => {
  if (!imageURl.startsWith("http"))
    return {
      ok: false,
      message: "The images of file system can´t be deleted",
    };

  const imageName = imageURl.split("/").pop()?.split(".")?.[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(ROUTES.ADMIN_PRODUCTS);
    revalidatePath(ROUTES.ADMIN_PRODUCT + deleteImage.product.slug);
    revalidatePath(ROUTES.PRODUCT + deleteImage.product.slug);

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
