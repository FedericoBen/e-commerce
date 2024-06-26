import styles from "./NewAccountPage.module.scss";
import { ROUTES } from "@/common/routes";
import NewAccountForm from "@/components/auth/new-account-form/NewAccountForm";
import Link from "next/link";

export default function NewAccountPage() {
  return (
    <div className={styles.container_page}>
      <h1>New account</h1>
      <NewAccountForm />
      <div className={styles.divider}>
        <div className={styles.line} />
        O
        <div className={styles.line} />
      </div>
      <Link className={styles.link} href={ROUTES.LOGIN}>
        Login
      </Link>
    </div>
  );
}
