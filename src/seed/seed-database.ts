import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories.map((category) => ({
      name: category,
    })),
  });

  await prisma.country.createMany({ data: countries });

  // const categoriesDB = await prisma.category.findMany();

  // const productsMap = products.map((product) => {
  //   const { type, ...productRest } = product;
  //   const categoryId =
  //     categoriesDB.find((cat) => cat.name.toLowerCase() == type.toLowerCase())
  //       ?.id || "not-specified";
  //   return {
  //     ...productRest,
  //     categoryId,
  //   };
  // });

  // productsMap.forEach(async (product) => {
  //   const { images, ...productToSave } = product;

  //   const savedProduct = await prisma.product.create({
  //     data: { ...productToSave },
  //   });

  //   const imageData = images.map((img) => ({
  //     url: img,
  //     productId: savedProduct.id,
  //   }));

  //   await prisma.productImage.createMany({ data: imageData });
  // });


  console.log("Seed executed success");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
