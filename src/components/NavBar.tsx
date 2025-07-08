import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { tokenPlayLoad } from "./profile/Profile";
import { useUser } from "../context/UserContext";
import { useEffect, useRef } from "react";

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

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
        <Link className="nav-link" to="login">
          Login
        </Link>
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
          <h1>Article Leen</h1>
        </Link>
        {availableOptions()}
      </div>
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`search/${searchRef.current?.value}`);
        }}
      >
        <input
          ref={searchRef}
          type="search"
          id="search-field"
          className="search-field"
          placeholder="Search"
          minLength={3}
          required
        />
      </form>
    </header>
  );
};

export default NavBar;
