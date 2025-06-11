import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { UserProvider } from "./UserContext";

const Home = () => {
  return (
    <div>
      <UserProvider>
        <NavBar />
        <div className="outlet flex-rowed">
          <Outlet />
        </div>
      </UserProvider>
    </div>
  );
};

export default Home;
