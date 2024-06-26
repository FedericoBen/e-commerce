export const revalidate = 604800; //* 7 Dias

import { notFound } from "next/navigation";
import ContainerProduct from "@/components/product/container-product/ContainerProduct";
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Metadata, ResolvingMetadata } from "next";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  const productImage = product?.images?.[0] ?? '/imgs/placeholder'

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: product?.title || "Product not found",
    description: product?.description || "Product not found",
    openGraph: {
      title: product?.title || "Product not found",
      description: product?.description || "Product not found",
      images: [productImage],
    },
  };
}

export default async function ProductPage({
  params: { slug },
}: ProductPageProps) {
  const product = await getProductBySlug(slug);

  if (!product) notFound();
  return (
    <>
      <ContainerProduct product={product} />
    </>
  );
}
