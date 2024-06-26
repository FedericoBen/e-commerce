import { titleFont } from "@/config/fonts";
import styles from "./ContainerProduct.module.scss";
import { Product } from "@/interfaces/products.interface";
import SlideShow from "./slide-show/SlideShow";
import SlideShowMobile from "./slide-show-mobile/SlideShowMobile";
import StockLabel from "./stock-label/StockLabel";
import AddToCart from "./add-to-cart/AddToCart";

interface ContainerProductProps {
  product: Product;
}

const ContainerProduct = ({ product }: ContainerProductProps) => {
  return (
    <div className={styles.container_product}>
      <div className={styles.main_section}>
        <div className={styles.slide_show}>
          <SlideShow images={product.images} title={product.title} />
          <SlideShowMobile images={product.images} title={product.title} />
        </div>
        <div className={styles.product_details}>
          <StockLabel slug={product.slug} />
          <h1 className={`${titleFont.className} ${styles.title_product}`}>
            {product.title}
          </h1>
          <p>$ {product.price}</p>
          <AddToCart product={product} />
          <h3>Description</h3>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ContainerProduct;
