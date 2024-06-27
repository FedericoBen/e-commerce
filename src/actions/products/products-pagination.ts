"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    const totalCountProducts = await prisma.product.count({});
    const totalPages = Math.ceil(totalCountProducts / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((img) => img.url),
      })),
    };
  } catch (error) {
    return {
      currentPage: page,
      totalPages: 1,
      products: [],
    };
  }
};

interface PaginationCategorynOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImagesGender = async ({
  page = 1,
  take = 12,
  gender = "" as Gender,
}: PaginationCategorynOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },

      where: {
        gender: gender ?? Gender.men,
      },
    });

    const totalCountProducts = await prisma.product.count({
      where: { gender: gender ?? Gender.men },
    });
    const totalPages = Math.ceil(totalCountProducts / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((img) => img.url),
      })),
    };
  } catch (error) {
    return {
      currentPage: page,
      totalPages: 1,
      products: [],
    };
  }
};
