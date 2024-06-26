"use client";
import styles from "./PlaceOrder.module.scss";
import { ROUTES } from "@/common/routes";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import useReHydrate from "@/hooks/use-re-hydrate/useReHydrate";
import Button from "@/components/ui/basics/Button/Button";
import { useAddressStore } from "@/store/address/address-store";
import { useState } from "react";
import { placeOrder } from "@/actions/order/place-order";
import { useRouter } from "next/navigation";


const PlaceOrder = () => {
  const [isCreatingAOrder, setIsCreatingAOrder] = useState(false);
  const [messageError, setMessageError] = useState("");
  const router = useRouter();
  const { total, subTotal, taxes, productInCart } = useCartStore((state) =>
    state.getSummaryInfo()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const address = useAddressStore((state) => state.address);

  const { loading } = useReHydrate();

  const onPlaceOrder = async () => {
    setIsCreatingAOrder(true);
    const productOrder = cart?.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productOrder, address);

    if (!resp.ok) {
      setMessageError(resp.message);
      setIsCreatingAOrder(false);
      return;
    }

    clearCart();
    router.push(ROUTES.ORDERS + resp.order?.id);
  };

  if (!loading) return null;

  return (
    <div className={styles.summary}>
      <div className={styles.address_data}>
        <h2>Delivery address</h2>
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      <div className={styles.pay_data}>
        <h2>Order resume</h2>
        <div className={styles.section_summary}>
          <span>No. Products</span>
          <span>{`${productInCart} article${
            productInCart > 1 ? "s" : ""
          }`}</span>
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
      </div>
      <p className={styles.alert}>
        {'By clicking on "create order", you accept our '}
        <a style={{ textDecoration: "underline" }} href="#">
          terms and conditions explained in our privacy policy
        </a>
      </p>
      {messageError && (
        <p className="fade-in" style={{ color: "red" }}>
          {messageError}
        </p>
      )}
      <Button disabled={isCreatingAOrder} onClick={onPlaceOrder}>
        Create order
      </Button>
    </div>
  );
};

export default PlaceOrder;
