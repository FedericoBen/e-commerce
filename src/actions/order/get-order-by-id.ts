"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session)
    return {
      ok: false,
      message: "Login to continue",
    };
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`${id} of order no exist`);

    if (session.user.role == "user" && session.user.id !== order.userId)
      throw new Error(`This order not belong to this user`);

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message ?? "Contact the administrator",
    };
  }
};
