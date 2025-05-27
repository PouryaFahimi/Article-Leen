import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="tiptap-toolbar">
      <Link to="/">Home</Link>
      <Link to="feed">Feed</Link>
      <Link to="profile">Profile</Link>
      <Link to="compose">Compose</Link>
      <input type="search" placeholder="Search" />
    </header>
  );
};

export default NavBar;
