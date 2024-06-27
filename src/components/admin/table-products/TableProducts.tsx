"use client";
import Link from "next/link";
import styles from "./TableProducts.module.scss";
import { ROUTES } from "@/common/routes";
import { Product } from "@/interfaces/products.interface";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";
import { IoTrashOutline } from "react-icons/io5";
import Button from "@/components/ui/basics/Button/Button";
import { deleteProduct } from "@/actions/products/delete-product";
import { useState } from "react";
import { useAlertMessage } from "@/providers/alert-message-provider/AlertMessageProvider";

interface TableProductsProps {
  products: Product[];
}

const TableProducts = ({ products }: TableProductsProps) => {
  const { setMessage } = useAlertMessage();

  const onDeleteProduct = async (product: Product) => {
    const resp = await deleteProduct(product);
    setMessage(resp.message, resp.ok ? "success" : "error");
  };

  return (
    <table className={styles.table_products}>
      <tbody>
        <tr className={styles.header_table}>
          <th>Image</th>
          <th style={{ flexBasis: "200px" }}>Title</th>
          <th>Price</th>
          <th>Gender</th>
          <th>Inventory</th>
          <th>Sizes</th>
          <th>Delete</th>
        </tr>
        {products.map((product) => {
          return (
            <tr key={product.id} className={styles.row_table}>
              <td>
                <Link href={ROUTES.PRODUCT + product.slug}>
                  <ProductImage
                    src={product.images[0]}
                    height={80}
                    width={80}
                    alt={product.title}
                  />
                </Link>
              </td>
              <td style={{ flexBasis: "200px" }}>
                <Link href={ROUTES.ADMIN_PRODUCT + product.slug}>
                  {product.title}
                </Link>
              </td>
              <td>{product.price}</td>
              <td>{product.gender}</td>
              <td>{product.inStock}</td>
              <td>{product.sizes.join(", ")}</td>
              <td>
                <Button
                  className={styles.button_delete}
                  onClick={() => onDeleteProduct(product)}
                >
                  <IoTrashOutline size={20} />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableProducts;
