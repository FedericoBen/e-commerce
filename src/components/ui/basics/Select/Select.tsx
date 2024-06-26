import { SelectHTMLAttributes, forwardRef } from "react";
import styles from "./Select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionsList: { name: string; id: string; value: any }[];
  label: string;
}

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { optionsList, label, ...rest },
  ref
) {
  return (
    <>
      <span className={styles.label}>{label}</span>
      <select className={styles.select} {...rest} ref={ref}>
        <option value="">[Select]</option>
        {optionsList.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
});
