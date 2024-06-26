export const revalidate = 60; //* 60 segundo

import { getPaginatedProductsWithImages } from "@/actions/products/products-pagination";
import { ROUTES } from "@/common/routes";
import Title from "@/components/ui/basics/Title/Title";
import Pagination from "@/components/ui/basics/pagination/Pagination";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./AdminProducts.module.scss";
import TableProducts from "@/components/admin/table-products/TableProducts";

interface AdminProductsProps {
  searchParams: {
    page?: string;
  };
}

export default async function AdminProductsPage({
  searchParams: { page },
}: AdminProductsProps) {
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1,
  });

  return (
    <div className={styles.container_page}>
      <div className={styles.container_components}>
        <Title title="Admin products" subtitle="All products" />
        <div className={styles.container_button_create_product}>
          <Link
            className={styles.button_create_product}
            href={ROUTES.ADMIN_PRODUCT + "new"}
          >
            Create new product
          </Link>
        </div>
        <TableProducts products={products} />
        {products.length > 0 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
