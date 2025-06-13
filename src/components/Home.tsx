import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { UserProvider } from "../context/UserContext";
import { AlertProvider } from "../context/AlertContext";

const Home = () => {
  return (
    <div>
      <UserProvider>
        <AlertProvider>
          <NavBar />
          <div className="outlet flex-rowed">
            <Outlet />
          </div>
        </AlertProvider>
      </UserProvider>
    </div>
  );
};

export default Home;
