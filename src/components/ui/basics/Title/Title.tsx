import { titleFont } from "@/config/fonts";
import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Title = ({ title, subtitle = "", className = "" }: TitleProps) => {
  return (
    <div className={`${className} ${styles.container_title}`}>
      <h1 className={`${titleFont.className} ${styles.title}`}>{title}</h1>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
};

export default Title;
