"use client";
import { ReactNode, useMemo, useState } from "react";
import styles from "./SideMenu.module.scss";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Link from "next/link";
import { ROUTES } from "@/common/routes";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/auth/logout";

interface OptionsMenuProps {
  icon: ReactNode;
  title: string;
  route: string;
  showWithOutAuth?: boolean | undefined;
  action?: () => void;
  role: ("admin" | "user")[];
}

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const ROUTES_MENU: OptionsMenuProps[] = useMemo(
    () =>
      [
        //* Options users
        {
          icon: <IoPersonOutline size={20} />,
          title: "Profile",
          route: ROUTES.PROFILE,
          role: ["user"],
        },
        {
          icon: <IoTicketOutline size={20} />,
          title: "Orders",
          route: ROUTES.ORDERS,
          role: ["user"],
        },
        //* Options admin
        {
          icon: <IoPersonOutline size={20} />,
          title: "Profile",
          route: ROUTES.PROFILE,
          role: ["admin"],
        },
        {
          icon: <IoShirtOutline size={20} />,
          title: "Products",
          route: ROUTES.ADMIN_PRODUCTS,
          role: ["admin"],
        },
        {
          icon: <IoTicketOutline size={20} />,
          title: "Orders",
          route: ROUTES.ADMIN_ORDERS,
          role: ["admin"],
        },
        {
          icon: <IoPersonOutline size={20} />,
          title: "Users",
          route: ROUTES.ADMIN_USERS,
          role: ["admin"],
        },

        //* Options admin and users
        {
          icon: <IoLogInOutline size={20} />,
          title: "Login",
          route: ROUTES.LOGIN,

          showWithOutAuth: true,
          role: ["user", "admin"],
        },
        {
          icon: <IoLogOutOutline size={20} />,
          title: "Logout",
          route: ROUTES.ROOT,
          action: async () => {
            await logout();
            window.location.replace(ROUTES.ROOT);
          },
          role: ["user", "admin"],
        },
      ].filter(
        (option) =>
          (!session && option.showWithOutAuth) ||
          (option.role.includes(String(session?.user.role)) &&
            !option.showWithOutAuth)
      ) as OptionsMenuProps[],
    [session]
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.button}>
        Menu
      </button>
      {open && (
        <nav className={`${styles.container_side_menu} fade-in`}>
          <div
            className={styles.background_menu}
            onClick={() => setOpen(false)}
          />
          <div className={styles.menu}>
            <IoCloseOutline
              size={30}
              className={styles.icon_close}
              onClick={() => setOpen(false)}
            />
            <div className={styles.searcher}>
              <IoSearchOutline size={20} />
              <input type="text" placeholder="Search" />
            </div>
            <div className={styles.container_options}>
              {ROUTES_MENU.map((option) => (
                <Link
                  key={option.title}
                  href={option.route}
                  className={styles.option}
                  onClick={() => {
                    setOpen(false);
                    option.action?.();
                  }}
                >
                  {option.icon}
                  <p>{option.title}</p>
                </Link>
              ))}
            </div>

            {/* <div className={styles.container_options}>
              
            </div> */}
          </div>
        </nav>
      )}
    </>
  );
};

export default SideMenu;
