"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { titleFont } from "@/config/fonts";
import { ROUTES } from "@/common/routes";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import SideMenu from "./SideMenu/SideMenu";
import { useCartStore } from "@/store/cart/cart-store";
import useReHydrate from "@/hooks/use-re-hydrate/useReHydrate";

const Navbar = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const { loading } = useReHydrate();  

  return (
    <nav className={styles.container_navbar}>
      {/* Logo */}
      <div>
        <Link href={ROUTES.ROOT}>
          <span className={`${titleFont.className} ${styles.title}`}>
            E-COMMERCE
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className={styles.container_menu_center}>
        <Link href={ROUTES.MEN} className={styles.button}>
          Men
        </Link>
        <Link href={ROUTES.WOMEN} className={styles.button}>
          Women
        </Link>
        <Link href={ROUTES.CHILDREN} className={styles.button}>
          Kids
        </Link>
      </div>
      {/* Search, cart, Menu */}
      <div className={styles.container_search_cart_menu}>
        <Link href={ROUTES.SEARCH}>
          <div>
            <IoSearchOutline size={20} />
          </div>
        </Link>
        <Link
          href={totalItemsInCart == 0 && loading ? ROUTES.EMPTY : ROUTES.CART}
        >
          <div className={styles.container_cart}>
            {loading && totalItemsInCart > 0 && (
              <span className={`fade-in ${styles.count_products}`}>
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline size={20} />
          </div>
        </Link>
        <SideMenu />
      </div>
    </nav>
  );
};

export default Navbar;
