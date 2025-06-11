import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { tokenPlayLoad } from "./profile/Profile";
import { useUser } from "./UserContext";
import { useEffect } from "react";

const NavBar = () => {
  const { user, setUser } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("article-leen-token");
    const decodedUsername = token
      ? jwtDecode<tokenPlayLoad>(token).username
      : "";

    if (!user && decodedUsername)
      setUser(decodedUsername ? { username: decodedUsername } : null);
    else if (!decodedUsername && user) setUser(null);
  }, [user, setUser]);

  const availableOptions = () => {
    if (!user)
      return (
        <>
          <Link className="nav-link" to="login">
            Login
          </Link>
          <Link className="nav-link" to="compose">
            Compose
          </Link>
        </>
      );
    else
      return (
        <>
          <Link className="nav-link" to={user.username}>
            Profile
          </Link>
          <Link className="nav-link" to="feed">
            Feed
          </Link>
          <Link className="nav-link" to="compose">
            Compose
          </Link>
        </>
      );
  };

  return (
    <header className="navbar">
      <div className="flex-line">
        <Link className="nav-link" to="/">
          Home
        </Link>
        {availableOptions()}
      </div>
      <input type="search" className="search-field" placeholder="Search" />
    </header>
  );
};

export default NavBar;
