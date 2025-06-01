import React, { useState } from "react";
import Feed from "../Feed";
import { jwtDecode } from "jwt-decode";

interface tokenPlayLoad {
  username: string;
  password: string;
  exp: number;
  iat: number;
}

const Profile = () => {
  const [articleNum, setArticleNum] = useState(0);
  const token = localStorage.getItem("article-leen-token");
  let username;
  if (token) {
    const decoded = jwtDecode<tokenPlayLoad>(token);
    username = decoded.username;
  } else {
    window.location.href = "http://localhost:5173/login";
  }

  const onLogout = () => {
    localStorage.setItem("article-leen-token", "");
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="prof">
      <div className="flex-rowed">
        <div className="prof-box prof-title">
          <h1>{username}</h1>
          <h4>joined at: xxx</h4>
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
        <div>
          <h2>Your Articles:</h2>
          <Feed username={username} counter={setArticleNum} />
        </div>
      </div>
      <div className="prof-box prof-stats">
        <h3>Your status:</h3>
        <p>total articles: {articleNum}</p>
        <p>stars achieved: 0</p>
      </div>
    </div>
  );
};

export default Profile;
