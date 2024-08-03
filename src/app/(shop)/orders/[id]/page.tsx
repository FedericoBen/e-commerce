import Title from "@/components/ui/basics/Title/Title";
import styles from "./OrderPage.module.scss";
import { ROUTES } from "@/common/routes";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils/currencyFormat";
import AlertPaid from "@/components/ui/basics/AlertPaid/AlertPaid";
import PayPalButton from "@/components/order/paypal/PayPalButton";
import { auth } from "@/auth.config";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

interface OrderPageProps {
  params: { id: string };
}
export default async function OrderPage({ params: { id } }: OrderPageProps) {
  const session = await auth();
  if (!session) redirect(ROUTES.ROOT);
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) redirect(ROUTES.ROOT);

  const { OrderAddress: address, OrderItem, isPaid } = order;

  return (
    <div className={styles.container_page}>
      <div className={styles.container_cart_shop}>
        <Title title={`Orde #${id.split("-").at(-1)}`} />
        <div className={styles.container_cart_summary}>
          <div className={styles.cart}>
            <AlertPaid paid={isPaid} />
            {OrderItem?.map((oi) => ({ ...oi, ...oi.product })).map(
              (product) => (
                <div
                  className={styles.card_product}
                  key={`${product.slug}-${product.size}`}
                >
                  <ProductImage
                    src={product.ProductImage?.[0]?.url}
                    alt={product.title}
                    height={100}
                    width={100}
                  />
                  <div className={styles.description}>
                    <h3>{product.title}</h3>
                    <p>
                      $ {product.price} x {product.quantity}
                    </p>
                    <p className={styles.subtotal}>
                      Sub total: $ {product.price * product.quantity}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className={styles.summary}>
            <div className={styles.address_data}>
              <h2>Delivery address</h2>
              {address && (
                <>
                  <p>
                    {address.firstName} {address.lastName}
                  </p>
                  <p>{address.address}</p>
                  <p>{address.address2}</p>
                  <p>{address.postalCode}</p>
                  <p>
                    {address.city}, {address.countryId}
                  </p>
                  <p>{address.phone}</p>
                </>
              )}
            </div>
            <div className={styles.pay_data}>
              <h2>Order resume</h2>
              <div className={styles.section_summary}>
                <span>No. Products</span>
                <span>
                  {`${order.itemsInOrder} article${
                    order.itemsInOrder > 1 ? "s" : ""
                  }`}
                </span>
              </div>
              <div className={styles.section_summary}>
                <span>Subtotal</span>
                <span>{currencyFormat(order.subTotal)}</span>
              </div>
              <div className={styles.section_summary}>
                <span>Taxes (%15)</span>
                <span>{currencyFormat(order.tax)}</span>
              </div>
              <div className={`${styles.section_summary} ${styles.total}`}>
                <span>Total</span>
                <span>{currencyFormat(order.total)}</span>
              </div>
            </div>
            <AlertPaid paid={isPaid} />
            {/* {!isPaid && session.user.role != "admin" && (
              <PayPalButton amount={order.total} orderId={order.id} />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
