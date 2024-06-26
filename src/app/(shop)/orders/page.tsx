export const revalidate = 0;

import Title from "@/components/ui/basics/Title/Title";
import styles from "./OrdersPages.module.scss";
import { IoCardOutline } from "react-icons/io5";
import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";
import Link from "next/link";
import TableOrders from "@/components/orders/table-orders/TableOrders";

export default async function OrdersPage() {
  const { orders = [], ok } = await getOrdersByUser();
  if (!ok) redirect(ROUTES.ROOT);

  return (
    <div className={styles.container_page}>
      <Title title="Orders" />
      <TableOrders
        orders={orders.map((order) => ({
          name: `${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`,
          id: order.id,
          isPaid: order.isPaid,
        }))}
      />
    </div>
  );
}
