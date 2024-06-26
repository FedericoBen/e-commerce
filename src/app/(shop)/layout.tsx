import Navbar from "@/components/ui/basics/Navbar/Navbar";
import styles from "./layout.module.scss";
import Footer from "@/components/ui/basics/Footer/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container_shop_layout}>
      <Navbar />
      {children}
      <Footer/>
    </main>
  );
}
