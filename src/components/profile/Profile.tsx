import { useState, useRef, useEffect } from "react";
import Feed from "../Feed";
import { jwtDecode } from "jwt-decode";
import { useFormattedDate } from "@/hooks/useFormattedDate";

interface tokenPlayLoad {
  username: string;
  password: string;
  exp: number;
  iat: number;
}

interface userSchema {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  who?: string;
  self?: boolean;
}

const Profile = ({ who = "" }: Props) => {
  const [articleNum, setArticleNum] = useState(0);
  const [user, setUser] = useState<userSchema>();
  const hasFetched = useRef(false);
  const token = localStorage.getItem("article-leen-token");

  const decodedUsername = token ? jwtDecode<tokenPlayLoad>(token).username : "";
  const username = who && decodedUsername !== who ? who : decodedUsername;

  const absoluteDate = useFormattedDate(user?.createdAt || "", "absolute");

  useEffect(() => {
    // redirect inside of useEffect won't interrupt the render phase
    if (!token) {
      window.location.href = "http://localhost:5173/login";
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${username}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchData();
  }, [token, username]);

  const onLogout = () => {
    localStorage.setItem("article-leen-token", "");
    window.location.href = "http://localhost:5173/";
  };

  return (
    <>
      <div className="prof">
        <div className="flex-rowed">
          <div className="prof-box prof-title">
            <h1>{username}</h1>
            <h5>Joined at: {absoluteDate}</h5>
            <button className="btn btn-secondary" onClick={onLogout}>
              Log out
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() =>
              (window.location.href = "http://localhost:5173/compose")
            }
          >
            Compose a new Article
          </button>
        </div>
        <div className="prof-box prof-stats">
          <h3>Status:</h3>
          <p>Total articles: {articleNum}</p>
          <p>Stars achieved: 0</p>
        </div>
      </div>
      <div className="flex-rowed">
        <h2>Published Articles:</h2>
        <Feed username={username} counter={setArticleNum} />
      </div>
    </>
  );
};

export default Profile;
