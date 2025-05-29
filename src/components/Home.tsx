import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <Outlet />
    </div>
  );
};

export default Home;
