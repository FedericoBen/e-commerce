"use server";

import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { deleteImageCloudinary } from "../cloudinary/delete-image";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteImageUser = async () => {
  const session = await auth();
  if (!session?.user)
    return {
      ok: false,
      message: "You need login first to update image",
    };

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        image: true,
      },
    });

    if (user?.image) {
      await deleteImageCloudinary(user.image);
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: null,
      },
    });
    
    revalidatePath(ROUTES.PROFILE);
    revalidatePath(ROUTES.LOGIN);
    return {
      ok: true,
      message: "User image update successfully",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
