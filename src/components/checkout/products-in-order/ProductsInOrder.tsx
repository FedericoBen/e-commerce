"use client";

import styles from "./ProductsInOrder.module.scss";
import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { ROUTES } from "@/common/routes";
import useReHydrate from "@/hooks/use-re-hydrate/useReHydrate";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

const ProductsInOrder = () => {
  const { cart: productsInCart } = useCartStore((state) => state);

  const { loading } = useReHydrate();
  return (
    <>
      {!loading ? (
        <span className="fade-in">Loading...</span>
      ) : (
        productsInCart.map((product) => (
          <div
            className={`fade-in ${styles.card_product}`}
            key={`${product.slug}-${product.size}`}
          >
            <ProductImage
              src={product.image}
              alt={product.title}
              height={100}
              width={100}
            />
            <div className={styles.description}>
              <Link
                className={styles.product_title_link}
                href={ROUTES.PRODUCT + product.slug}
              >
                <h4>
                  {product.size} - {product.title} ({product.quantity})
                </h4>
              </Link>
              <p style={{ fontWeight: "bold" }}>$ {product.price}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ProductsInOrder;
