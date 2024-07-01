"use server";

import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const updateImageUser = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user)
    return {
      ok: false,
      message: "You need login first to update image",
    };
  try {
    const image = formData.getAll("image")[0] as File;

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const { secure_url } = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`
    );
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: secure_url,
      },
    });
    revalidatePath(ROUTES.PROFILE);
    revalidatePath(ROUTES.LOGIN);
    return {
      ok: true,
      message: 'User image update successfully',
      user
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
