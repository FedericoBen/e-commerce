import styles from "./AlertPaid.module.scss";
import { IoCardOutline } from "react-icons/io5";

interface AlertPaid {
  paid: boolean;
}

const AlertPaid = ({ paid }: AlertPaid) => {
  return (
    <span className={`${styles.alert_paid} ${!paid && styles.alert_no_paid}`}>
      <IoCardOutline size={30} />
      {paid ? "Paid " : "No paid"}
    </span>
  );
};

export default AlertPaid;
