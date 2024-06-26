"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();
  if (!session)
    return {
      ok: false,
      message: "You should login",
    };
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
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

export const getOrdersInfoByUser = async () => {
  const session = await auth();
  if (!session)
    return {
      ok: false,
      message: "You should login",
    };
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
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
