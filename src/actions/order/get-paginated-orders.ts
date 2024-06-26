"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
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
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return {
      ok: true,
      orders,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message ?? "Contact the administrator",
    };
  }
};
