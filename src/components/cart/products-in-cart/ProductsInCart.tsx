"use client";

import styles from "./ProductsInCart.module.scss";
import { useCartStore } from "@/store/cart/cart-store";
import QuantitySelector from "@/components/ui/basics/quantity-selector/QuantitySelector";
import Link from "next/link";
import { ROUTES } from "@/common/routes";
import Button from "@/components/ui/basics/Button/Button";
import useReHydrate from "@/hooks/use-re-hydrate/useReHydrate";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

const ProductsInCart = () => {
  const {
    cart: productsInCart,
    updateProductQuantity,
    removeProduct,
  } = useCartStore((state) => state);

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
                <h3>{product.title}</h3>
                <h4>{product.size}</h4>
              </Link>
              <p>$ {product.price}</p>
              <QuantitySelector
                quantity={product.quantity}
                onChange={(newQuantity) =>
                  updateProductQuantity(product, newQuantity)
                }
              />
              <Button onClick={() => removeProduct(product)}>Remove</Button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ProductsInCart;
