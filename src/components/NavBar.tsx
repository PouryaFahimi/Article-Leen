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
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decodedToken = jwtDecode<tokenPlayLoad>(token);
      const expirationTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (expirationTime > currentTime)
        setUser({ username: decodedToken.username });
      else setUser(null); // expired
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [setUser]);

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
    <header>
      <div className="navbar width-limit">
        <div className="flex-line">
          <Link className="nav-link" to="/">
            <h1>Article Leen</h1>
          </Link>
          {availableOptions()}
        </div>
        {user && (
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
        )}
      </div>
    </header>
  );
};

export default NavBar;
