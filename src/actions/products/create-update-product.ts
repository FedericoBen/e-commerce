"use server";

import { ROUTES } from "@/common/routes";
import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),

  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false, message: "Product can´t be parse" };
  }

  const product = productParsed.data;

  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, "-").trim();
  const { id, ...restProduct } = product;
  let message: string = "";

  let newProduct: Product | undefined;
  try {
    const prismaTX = await prisma.$transaction(async (tx) => {

      const tagsArray = restProduct.tags
        .split(",")
        .map((tag) => tag.trim().toLocaleLowerCase());

      if (id) {
        newProduct = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
        message = "The product was update successfully";
      } else {
        newProduct = await tx.product.create({
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
        message = "The product was created successfully";
      }

      if (formData.getAll("images")?.length < 5) {
        const images = await uploadImages(formData.getAll("images") as File[]);

        if (!images)
          throw new Error("The images can´t be uploaded, rollingback");
        const data = images.map((img) => ({
          url: img ?? "",
          productId: newProduct?.id ?? '',
        }));

        await tx.productImage.createMany({
          data,
        });
      }
      return {
        product,
      };
    });

    revalidatePath(ROUTES.ROOT);
    revalidatePath(ROUTES.ADMIN_PRODUCTS);
    revalidatePath(ROUTES.ADMIN_PRODUCT + prismaTX.product.slug);
    revalidatePath(ROUTES.PRODUCT + prismaTX.product.slug);

    return {
      ok: true,
      product: prismaTX.product,
      message,
    };

    // console.log(formData);
  } catch (error: any) {
    console.log(error);
    console.log(newProduct);
    return {
      ok: false,
      message: error.message ?? "Error with operation product",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.allSettled(uploadPromises);
    return uploadedImages.map((ui) =>
      ui.status == "fulfilled" ? ui.value : null
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
