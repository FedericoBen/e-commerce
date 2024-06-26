"use server";

import { ROUTES } from "@/common/routes";
import { PayPalOrderStatusResponse } from "@/interfaces/paypal.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: any) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken)
    return {
      ok: false,
      message: "Unable to get the authToken",
    };
  const resp = await verifyPayPalPayment(transactionId, authToken);
  if (!resp)
    return {
      ok: false,
      message: "Error to verify paid",
    };
  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED")
    return {
      ok: false,
      message: "Transaction no completed",
    };

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    revalidatePath(ROUTES.ORDERS + orderId);
  } catch (error) {
    return {
      ok: false,
      message: "500 - The paid cant be completed",
    };
  }

  //   const {} = purchase_units[0];
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const resp = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return resp.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
