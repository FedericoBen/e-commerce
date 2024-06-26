import { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string | undefined | null | boolean;
  label: string;
}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
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
        <textarea {...rest} className={`${styles.textarea}`} ref={ref} />
      </label>
    </>
  );
});
