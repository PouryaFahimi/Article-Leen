import { useState, useRef, useEffect } from "react";
import Feed from "../feed/Feed";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import styles from "./Profile.module.scss";

export interface tokenPlayLoad {
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

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [articleNum, setArticleNum] = useState(0);
  const [profileUser, setProfileUser] = useState<userSchema>();
  const hasFetched = useRef(false);
  const { showAlert } = useAlert();

  const { username } = useParams();
  const isSelf = username === user?.username ? true : false;

  const absoluteDate = useFormattedDate(
    profileUser?.createdAt || "",
    "absolute"
  );

  useEffect(() => {
    // redirect inside of useEffect won't interrupt the render phase
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${username}`);
        const data = await res.json();
        setProfileUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchData();
  }, [user, username]);

  const onLogout = () => {
    localStorage.setItem("article-leen-token", "");
    setUser(null);
    showAlert("Logged Out!");
    navigate("/");
  };

  return (
    <>
      <div className={styles.prof}>
        <div className="flex-rowed">
          <div className={`${styles.profBox} ${styles.profTitle}`}>
            <h1>{username}</h1>
            <h5>Joined at: {absoluteDate}</h5>
            {isSelf && (
              <button className="btn btn-secondary" onClick={onLogout}>
                Log out
              </button>
            )}
          </div>
          {isSelf && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/compose")}
            >
              Compose a new Article
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => navigate("likes")}
          >
            Likes
          </button>
          {isSelf && (
            <button className="btn btn-secondary">Bookmarked Articles</button>
          )}
        </div>
        <div className={`${styles.profBox} ${styles.profStats}`}>
          <h3>Status:</h3>
          <p>Total articles: {articleNum}</p>
          <p>Hearts achieved: 0</p>
        </div>
      </div>
      <div className="flex-rowed">
        <h2>Published Articles:</h2>
        <Feed who={username} counter={setArticleNum} />
      </div>
    </>
  );
};

export default Profile;
