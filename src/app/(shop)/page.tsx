export const revalidate = 60; //* 60 segundo

import Title from "@/components/ui/basics/Title/Title";

import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import { getPaginatedProductsWithImages } from "@/actions/products/products-pagination";
import Pagination from "@/components/ui/basics/pagination/Pagination";
import { Metadata } from "next";

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title: {
    template: "%s - E-COMMERS | Shop",
    default: "E-COMMERS | Shop",
  },
  description: "Online store",
  openGraph: {
    title: "E-commerce",
    description: "Online store",
    images: ['/imgs/e-commerce-view.jpg'],
  },
};

export default async function Home({ searchParams: { page } }: HomeProps) {
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1,
  });

  return (
    <>
      <Title title="Shop" subtitle="All products" />
      <ProductsGrid products={products} />
      {products.length > 0 && <Pagination totalPages={totalPages} />}
    </>
  );
}
