"use server";

import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "desc" },
    });
    return {
      ok: true,
      categories,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error to get categories",
    };
  }
};
