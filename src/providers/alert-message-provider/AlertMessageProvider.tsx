"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./AlertMessageProvider.module.scss";
import { IoCloseOutline } from "react-icons/io5";

interface AlertMessageProviderProps {
  children: ReactNode;
}

interface AlertMessageContextProps {
  setMessage: (message: string, type?: string) => void;
}

const AlertMessageContext = createContext<AlertMessageContextProps | null>(
  null
);

interface ObjectMessage {
  message: string;
  type: string;
}

interface AlertMessageProps {
  onClose: () => void;
  objectMessage: ObjectMessage;
}

const AlertMessage = ({
  onClose,
  objectMessage: { message = "", type = "success" },
}: AlertMessageProps) => {
  return (
    <div
      style={{
        opacity: message ? 1 : 0,
        zIndex: message ? 20 : 0,
        backgroundColor: type == "success" ? "#49e048" : "#e62e1b",
      }}
      className={styles.alert_message}
    >
      <div className={styles.container_message}>{message}</div>
      <div className={styles.container_icon_close} onClick={onClose}>
        <IoCloseOutline size={30} />
      </div>
    </div>
  );
};

const initStateMessage: ObjectMessage = {
  message: "",
  type: "success",
};

const AlertMessageProvider = ({ children }: AlertMessageProviderProps) => {
  const [messageAlert, setMessageAlert] =
    useState<ObjectMessage>(initStateMessage);

  const setMessage = (message: string, type: string = "success") => {
    setMessageAlert({
      message,
      type,
    });
  };

  return (
    <AlertMessageContext.Provider value={{ setMessage }}>
      <AlertMessage
        onClose={() => setMessageAlert(initStateMessage)}
        objectMessage={messageAlert}
      />
      {children}
    </AlertMessageContext.Provider>
  );
};

export const useAlertMessage = () =>
  useContext(AlertMessageContext) as AlertMessageContextProps;

export default AlertMessageProvider;
