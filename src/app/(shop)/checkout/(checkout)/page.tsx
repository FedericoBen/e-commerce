import Title from "@/components/ui/basics/Title/Title";
import styles from "./CheckoutPage.module.scss";
import Link from "next/link";
import { ROUTES } from "@/common/routes";
import ProductsInOrder from "@/components/checkout/products-in-order/ProductsInOrder";
import PlaceOrder from "@/components/checkout/place-order/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className={styles.container_page}>
      <div className={styles.container_cart_shop}>
        <Title title="Verify order" />
        <div className={styles.container_cart_summary}>
          <div className={styles.cart}>
            <div className={styles.title}>
              <h3>Adjust elements</h3>
              <Link style={{textDecoration:'underline'}} href={ROUTES.CART}>Modify cart</Link>
            </div>
            <ProductsInOrder />
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
