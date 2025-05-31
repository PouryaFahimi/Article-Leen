import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="outlet flex-rowed">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
