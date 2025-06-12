// components/Dropdown.tsx
import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdMoreVert } from "react-icons/md";
import styles from "./Dropdown.module.scss";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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
        <MdMoreVert size={20} />
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
            {items.map((item) => (
              <button
                key={item.value}
                className={styles.item}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
