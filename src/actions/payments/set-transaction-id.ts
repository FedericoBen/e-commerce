"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const orderToModify = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!orderToModify)
      return {
        ok: false,
        message: `No exist a order with id : '${orderId}'`,
      };

    const orderUpdate = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...orderToModify,
        transactionId,
      },
    });

    return {
      ok: true,
      transactionId,
      orderUpdate,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message ?? "Contact the administrator",
    };
  }
};
