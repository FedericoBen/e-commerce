import Title from "@/components/ui/basics/Title/Title";
import styles from "./Cart.module.scss";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import { ROUTES } from "@/common/routes";

import { redirect } from "next/navigation";
import QuantitySelector from "@/components/ui/basics/quantity-selector/QuantitySelector";
import ProductsInCart from "@/components/cart/products-in-cart/ProductsInCart";
import OrderSummary from "@/components/cart/order-summary/OrderSummary";

const products = initialData.products.slice(0, 3);

export default function CartPage() {
  // redirect(ROUTES.EMPTY)

  return (
    <div className={styles.container_page}>
      <div className={styles.container_cart_shop}>
        <Title title="Cart shop" />
        <div className={styles.container_cart_summary}>
          <div className={styles.cart}>
            <div className={styles.title}>
              <h3>Add more products</h3>
              <Link href={ROUTES.ROOT}>Continue shopping</Link>
            </div>
            <ProductsInCart />
          </div>
          <OrderSummary/>
        </div>
      </div>
    </div>
  );
}
