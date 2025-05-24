import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <h1>Here you should see Articles</h1>
      <h1>Here you can write an Article</h1>
      <Outlet />
    </div>
  );
};

export default Home;
