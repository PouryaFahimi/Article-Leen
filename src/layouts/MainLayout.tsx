import NavBar from "@/components/NavBar";
import { AlertProvider } from "../context/AlertContext";
import { UserProvider } from "../context/UserContext";
import React from "react";
import { Outlet } from "react-router";
import Footer from "@/components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div>
      <UserProvider>
        <AlertProvider>
          <NavBar />
          <main>
            <div className="outlet flex-rowed width-limit">
              <Outlet />
            </div>
          </main>
          <Footer />
        </AlertProvider>
      </UserProvider>
    </div>
  );
};

export default MainLayout;
