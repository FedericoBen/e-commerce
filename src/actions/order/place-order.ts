"use server";

import { auth } from "@/auth.config";
import { InterfaceAddress } from "@/interfaces/address.interface";
import { Size } from "@/interfaces/products.interface";
import prisma from "@/lib/prisma";

interface productToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsToOrder: productToOrder[],
  address: InterfaceAddress
) => {
  const session = await auth();
  if (!session?.user.id)
    return {
      ok: false,
      message: "The user session no exist",
    };

  const userId = session.user.id;
  //   console.log({ address, productsToOrder, userId });

  //Obtener la informacion de los usuarios
  //Nota: recuerden que se puede llevar 2 o mas productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((p) => p.productId),
      },
    },
  });

  //Calcular los montos
  const itemsInOrder = productsToOrder.reduce(
    (count, product) => count + product.quantity,
    0
  );

  //Total de tax , subtotal y total
  const { subTotal, tax, total } = productsToOrder.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id == item.productId);
      if (!product) throw new Error(`${item.productId} no exist - 500`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  //Crear la transaccion en la DB

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. actualizar el stock de los productos

      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productsToOrder
          .filter((p) => p.productId == product.id)
          .reduce(
            (accumulatedQuantity, item) => item.quantity + accumulatedQuantity,
            0
          );

        if (productQuantity <= 0)
          throw new Error(`${product.id} not have stock defined`);

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((up) => {
        if (up.inStock < 0) {
          throw new Error(`${up.title} Not have enough stock in the inventory`);
        }
      });

      //2. crear la orden - encabezado - detalle

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productsToOrder.map(({ quantity, size, productId }) => ({
                quantity,
                size,
                productId,
                price:
                  products.find((product) => product.id == productId)?.price ??
                  0,
              })),
            },
          },
        },
      });

      //3. crear la direccion de la orden
      const { country: countryId, ...addressRest } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: addressRest.firstName,
          lastName: addressRest.lastName,
          address: addressRest.address,
          address2: addressRest.address2,
          city: addressRest.city,
          postalCode: addressRest.postalCode,
          phone: addressRest.phone,
          countryId,
          orderId: order.id,
        },
      });

      return {
        updatedProducts,
        order,
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};
