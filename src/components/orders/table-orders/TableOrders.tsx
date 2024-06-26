import { IoCardOutline } from "react-icons/io5";
import styles from "./TableOrders.module.scss";
import Link from "next/link";
import { ROUTES } from "@/common/routes";

interface TableOrdersProps {
  orders: { id: string; name: string; isPaid: boolean }[];
}

const TableOrders = ({ orders }: TableOrdersProps) => {
  return (
    <table className={styles.table_orders}>
      <tbody>
        <tr className={styles.header_table}>
          <th>#ID</th>
          <th>Full Name</th>
          <th>State Order</th>
          <th>Option</th>
        </tr>
        {orders.map((order) => (
          <tr key={order.id} className={styles.row_table}>
            <td>{order.id.split("-").at(-1)}</td>
            <td>{order.name}</td>
            <td>
              <span
                className={`${styles.status_order} ${
                  order.isPaid ? styles.paid : styles.unpaid
                }`}
              >
                <IoCardOutline size={20} />
                {order.isPaid ? "Paid" : "No paid"}
              </span>
            </td>
            <td>
              <Link className={styles.link} href={ROUTES.ORDERS + order.id}>
                View order
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOrders;
