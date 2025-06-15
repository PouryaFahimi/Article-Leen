import React, { createContext, useCallback, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Alert, AlertType } from "../components/universal/Alert";

interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: AlertType;
  } | null>(null);

  const showAlert = useCallback((message: string, type: AlertType = "info") => {
    setAlert({ message, type });
  }, []);

  const handleClose = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert &&
        ReactDOM.createPortal(
          <div className="alert-container">
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={handleClose}
            />
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
