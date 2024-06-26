"use server";

import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  if (!session)
    return {
      ok: false,
      message: "You should login",
    };
  if (session.user.role != "admin") {
    return {
      ok: false,
      message: "User invalid",
    };
  }
  try {
    const newRole = role == "admin" ? "admin" : "user";
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath(ROUTES.ADMIN_USERS);
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: "The role chan be change",
    };
  }
};
