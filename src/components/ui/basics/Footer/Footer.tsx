import Link from "next/link";
import styles from "./Footer.module.scss";
import { ROUTES } from "@/common/routes";

const Footer = () => {
  return (
    <div className={styles.container_footer}>
      <Link className={styles.link} href={ROUTES.ROOT}>
        <span className={styles.e_commerce}>E-COMMERCE</span>
        <span>| Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link className={styles.link} href={ROUTES.ROOT}>
        <span>Privacy</span>
        <span>&</span>
        <span>Legal</span>
      </Link>
      <Link className={styles.link} href={ROUTES.ROOT}>
        <span>Locations</span>
      </Link>
    </div>
  );
};

export default Footer;
