import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Alert.module.scss";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

export type AlertType = "success" | "error" | "info";

interface AlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className={styles.icon} />;
      case "error":
        return <FaExclamationCircle className={styles.icon} />;
      default:
        return <FaInfoCircle className={styles.icon} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.alert} ${styles[type]}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};
