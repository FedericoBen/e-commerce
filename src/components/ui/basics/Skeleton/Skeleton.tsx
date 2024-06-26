import { CSSProperties } from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  style?: CSSProperties;
}

const Skeleton = ({ style }: SkeletonProps) => {
  return <div style={{ ...style }} className={styles.skeleton} />;
};

export default Skeleton;
