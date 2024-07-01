import Link from "next/link";
import styles from "./NotFound.module.scss";
import React from "react";
import { ROUTES } from "@/common/routes";
import { titleFont } from "@/config/fonts";
import ProductImage from "../Image/product-image/ProductImage";

const NotFound = () => {
  return (
    <div className={styles.container_not_found}>
      <div className={styles.container_info}>
        <h2 className={`${titleFont.className} ${styles.title}`}>404</h2>
        <h2 className={styles.message}>Whoops ! We sorry</h2>
        <h2 className={styles.go_back_message}>
          You can Go back to
          <Link href={ROUTES.ROOT}>home</Link>
        </h2>
      </div>
      <ProductImage
        src="/imgs/starman_750x750.png"
        alt="Starman"
        width={550}
        height={550}
        className={styles.image_not_found}
      />
    </div>
  );
};

export default NotFound;
