"use server";

import { ROUTES } from "@/common/routes";
import { Product } from "@/interfaces/products.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./delete-product-image";

export const deleteProduct = async (product: Product) => {
  if (!product)
    return {
      ok: false,
      message: "You need a product to delete",
    };
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      const images = product.ProductImage;

      if (images) {
        await tx.productImage.deleteMany({
          where: {
            id: {
              in: images?.map((img) => img.id),
            },
          },
        });
        images?.forEach(async (img) => await deleteImage(img.id, img.url));
      }
      await tx.product.delete({ where: { id: product.id } });
      return { product };
    });

    revalidatePath(ROUTES.ADMIN_PRODUCTS);
    revalidatePath(ROUTES.ADMIN_PRODUCT + product.slug);
    revalidatePath(ROUTES.PRODUCT + product.slug);

    return {
      ok: true,
      message: "Product was deleted",
      product: prismaTX.product,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "The product can´t be deleted",
    };
  }
};
