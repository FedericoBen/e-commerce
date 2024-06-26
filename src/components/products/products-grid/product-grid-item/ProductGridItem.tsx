"use client";
import { Product } from "@/interfaces/products.interface";
import styles from "./ProductGridItem.module.scss";
import Link from "next/link";
import { ROUTES } from "@/common/routes";
import { useState } from "react";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

interface ProductGridItemProps {
  product: Product;
}

const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images?.[0]);
  return (
    <Link
      className={`${styles.container_product_item} fade-in`}
      href={ROUTES.PRODUCT + product.slug}
    >
      <ProductImage
        className={styles.image_product}
        src={displayImage}
        alt={product.title}
        width={500}
        height={500}
        onMouseEnter={() => setDisplayImage(product.images?.[1])}
        onMouseLeave={() => setDisplayImage(product.images?.[0])}
      />
      <div className={styles.container_info}>
        <span className={styles.link_product}>{product.title}</span>
        <span className={styles.price}>$ {product.price}</span>
      </div>
    </Link>
  );
};

export default ProductGridItem;
