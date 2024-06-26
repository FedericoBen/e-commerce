"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
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
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    });
    return {
      ok: true,
      users,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message ?? "Contact the administrator",
    };
  }
};
