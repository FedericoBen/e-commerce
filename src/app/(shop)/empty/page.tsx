import { ROUTES } from "@/common/routes";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import styles from './EmptyPage.module.scss'

export default function EmptyPage() {
  return (
    <div className={styles.container_page}>
      <IoCartOutline size={80} />
      <div className={styles.message_empty}>
        <h2>Your cart is empty</h2>
        <Link className={styles.go_back} href={ROUTES.ROOT}>Go back</Link>
      </div>
    </div>
  );
}
