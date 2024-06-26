import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | undefined | null | boolean;
  label: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { errorMessage, label, ...rest },
  ref
) {
  return (
    <>
      {errorMessage && <p className={styles.alert_input}>{errorMessage} </p>}
      <label
        className={`${styles.container_input} ${errorMessage && styles.error}`}
      >
        <span className={styles.label}>{label}</span>
        <input {...rest} className={`${styles.input}`} ref={ref} />
      </label>
    </>
  );
});
