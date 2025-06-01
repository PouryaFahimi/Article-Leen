import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="flex-line">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="login">
          Login
        </Link>
        <Link className="nav-link" to="feed">
          Feed
        </Link>
        <Link className="nav-link" to="profile">
          Profile
        </Link>
        <Link className="nav-link" to="compose">
          Compose
        </Link>
      </div>
      <input type="search" className="search-field" placeholder="Search" />
    </header>
  );
};

export default NavBar;
