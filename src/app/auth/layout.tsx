import { auth } from "@/auth.config";
import styles from "./layout.module.scss";
import { redirect } from "next/navigation";
import { ROUTES } from "@/common/routes";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (session?.user) redirect(ROUTES.ROOT);

  return <main className={styles.container_auth_layout}>{children}</main>;
}
