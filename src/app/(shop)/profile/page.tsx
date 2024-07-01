import { getOrdersInfoByUser } from "@/actions/order/get-orders-by-user";
import styles from "./Profile.module.scss";
import { auth } from "@/auth.config";
import { ROUTES } from "@/common/routes";
import Title from "@/components/ui/basics/Title/Title";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageUser from "@/components/profile/image-user/ImageUser";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  const { ok, orders = null } = await getOrdersInfoByUser();

  if (!session?.user || !ok) redirect(ROUTES.ROOT);

  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const { name, email, image } = session?.user;

  // console.log(session?.user);

  return (
    <div className={styles.container_page}>
      <div className={styles.container_components}>
        <Title title="Profile" />
        <div className={styles.info_user}>
          <section className={styles.data_user}>
            <h1>{email}</h1>
            <p>{name}</p>
          </section>
          <ImageUser image={userData?.image} />
          <Link href={ROUTES.ORDERS}>
            <section className={styles.data_orders}>
              <h4>Orders: </h4>
              <p>{orders?.length}</p>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
}
