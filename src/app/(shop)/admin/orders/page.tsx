import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import styles from "./OrdersAdmin.module.scss";
import TableOrders from "@/components/orders/table-orders/TableOrders";
import Title from "@/components/ui/basics/Title/Title";

export default async function AdminOrdersPage() {
  const { orders } = await getPaginatedOrders();

  return (
    <div className={styles.container_page}>
      <Title title="Orders" />
      <TableOrders
        orders={
          orders?.map((order) => ({
            name: `${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`,
            id: order.id,
            isPaid: order.isPaid,
          })) || []
        }
      />
    </div>
  );
}
