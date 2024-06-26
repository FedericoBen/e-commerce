"use client";
import Link from "next/link";
import styles from "./OrderSummary.module.scss";
import { ROUTES } from "@/common/routes";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import useReHydrate from "@/hooks/use-re-hydrate/useReHydrate";

const OrderSummary = () => {
  const { total, subTotal, taxes, productInCart } = useCartStore((state) =>
    state.getSummaryInfo()
  );

  const { loading } = useReHydrate();

  if (!loading) return null;

  return (
    <div className={`fade-in ${styles.summary}`}>
      <h2>Order resume</h2>
      <div className={styles.section_summary}>
        <span>No. Products</span>
        <span>{`${productInCart} article${productInCart > 1 ? "s" : ""}`}</span>
      </div>
      <div className={styles.section_summary}>
        <span>Subtotal</span>
        <span>{currencyFormat(subTotal)}</span>
      </div>
      <div className={styles.section_summary}>
        <span>Taxes (15%)</span>
        <span>{currencyFormat(taxes)}</span>
      </div>
      <div className={`${styles.section_summary} ${styles.total}`}>
        <span>Total</span>
        <span>{currencyFormat(total)}</span>
      </div>
      {productInCart != 0 && (
        <Link className={styles.checkout} href={ROUTES.ADDRESS}>
          Checkout
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;
