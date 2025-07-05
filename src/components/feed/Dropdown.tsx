// components/Dropdown.tsx
import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdMoreVert } from "react-icons/md";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current
        // && !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <MdMoreVert className="mid-icon" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
