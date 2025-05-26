import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="feed">Feed</Link>
      <Link to="profile">Profile</Link>
      <iframe
        src="https://template.tiptap.dev/preview/templates/simple"
        width={400}
        height={600}
      />
      <input type="search" placeholder="Search" />
    </header>
  );
};

export default NavBar;
