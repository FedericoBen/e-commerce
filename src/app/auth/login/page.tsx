import Link from "next/link";
import styles from "./LoginPage.module.scss";
import { ROUTES } from "@/common/routes";
import LoginForm from "@/components/auth/login-form/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container_page}>
      <h1>Login</h1>
      <LoginForm />
      <div className={styles.divider}>
        <div className={styles.line} />
        O
        <div className={styles.line} />
      </div>
      <Link className={styles.link} href={ROUTES.NEW_ACCOUNT}>
        Create new account
      </Link>
    </div>
  );
}
