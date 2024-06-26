import styles from "./ProductsGrid.module.scss";
import { Product } from "../../../interfaces/products.interface";
import ProductGridItem from "./product-grid-item/ProductGridItem";

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div
      className={`${styles.container_grid} ${
        products.length < 4 ? styles.flex : styles.grid
      }`}
    >
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
