import Link from "next/link";
import styles from "./TableProducts.module.scss";
import { ROUTES } from "@/common/routes";
import { Product } from "@/interfaces/products.interface";
import ProductImage from "@/components/ui/basics/Image/product-image/ProductImage";

interface TableProductsProps {
  products: Product[];
}

const TableProducts = ({ products }: TableProductsProps) => {
  return (
    <table className={styles.table_products}>
      <tbody>
        <tr className={styles.header_table}>
          <th>Image</th>
          <th style={{ flexBasis: "200px" }}>Title</th>
          <th>Price</th>
          <th>Gender</th>
          <th>Inventory</th>
          <th>Sizes</th>
        </tr>
        {products.map((product) => {
          return (
            <tr key={product.id} className={styles.row_table}>
              <td>
                <Link href={ROUTES.PRODUCT + product.slug}>
                  <ProductImage
                    src={product.images[0]}
                    height={80}
                    width={80}
                    alt={product.title}
                  />
                </Link>
              </td>
              <td style={{ flexBasis: "200px" }}>
                <Link href={ROUTES.ADMIN_PRODUCT + product.slug}>
                  {product.title}
                </Link>
              </td>
              <td>{product.price}</td>
              <td>{product.gender}</td>
              <td>{product.inStock}</td>
              <td>{product.sizes.join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableProducts;
