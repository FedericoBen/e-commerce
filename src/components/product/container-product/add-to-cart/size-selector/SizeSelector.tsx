import { Size } from "@/interfaces/products.interface";
import styles from "./SizeSelector.module.scss";

interface SizeSelectorProps {
  selectedSize: Size | null;
  availableSizes: Size[];
  onChange: (size: Size) => void;
}

const SizeSelector = ({
  selectedSize,
  availableSizes,
  onChange,
}: SizeSelectorProps) => {
  return (
    <div className={styles.container_size_selector}>
      <h3 className={styles.tile_sizes}>Available sizes</h3>
      <div className={styles.container_size}>
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`${styles.size} ${
              selectedSize == size && styles.selected
            }`}
            onClick={() => onChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
