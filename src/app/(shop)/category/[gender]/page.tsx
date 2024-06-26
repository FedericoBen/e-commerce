export const revalidate = 60; //* 60 segundo

import { getPaginatedProductsWithImagesGender } from "@/actions/products/products-pagination";
import { ROUTES } from "@/common/routes";
import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import Title from "@/components/ui/basics/Title/Title";
import Pagination from "@/components/ui/basics/pagination/Pagination";
import { ValidCategory } from "@/interfaces/products.interface";
import { notFound, redirect } from "next/navigation";

interface CategoryPageProps {
  params: {
    gender: ValidCategory;
  };
  searchParams: {
    page?: string;
  };
}
const ALLOWED_CATEGORIES = ["men", "women", "kid"];

export default async function CategoryPage({
  params: { gender },
  searchParams: { page },
}: CategoryPageProps) {
  if (!ALLOWED_CATEGORIES.includes(gender)) notFound();
  const { products, totalPages } = await getPaginatedProductsWithImagesGender({
    page: page ? parseInt(page) : 1,
    gender,
  });

  return (
    <>
      <Title title={`${gender}'s articles`} subtitle={`All products`} />
      <ProductsGrid products={products} />
      {products.length > 0 && <Pagination totalPages={totalPages} />}
    </>
  );
}
