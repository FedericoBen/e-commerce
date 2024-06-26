import { getOrdersInfoByUser } from "@/actions/order/get-orders-by-user";
import styles from "./Profile.module.scss";
import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import Title from "@/components/ui/basics/Title/Title";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const { ok, orders = null } = await getOrdersInfoByUser();

  if (!session?.user || !ok) redirect(ROUTES.ROOT);

  const { name, email, image } = session?.user;

  return (
    <div className={styles.container_page}>
      <div className={styles.container_components}>
        <Title title="Profile" />
        <div className={styles.info_user}>
          <section className={styles.data_user}>
            <h1>{email}</h1>
            <p>{name}</p>
          </section>
          <section className={styles.container_image_user}>
            <Image
              src={image ?? "/imgs/user-default.webp"}
              alt="images of user"
              height={200}
              width={200}
            />
          </section>
          <Link href={ROUTES.ORDERS}>
            <section className={styles.data_orders}>
              <strong>Orders: </strong>
              <p>{orders?.length}</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}
