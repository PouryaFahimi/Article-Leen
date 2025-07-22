import Feed from "@/components/feed/Feed";
import PersonList from "@/components/profile/PersonList";
import { useState } from "react";
import { useParams } from "react-router";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const [articleNum, setArticleNum] = useState(0);
  const [mode, setMode] = useState("article");
  const { query } = useParams();

  return (
    <div className="flex-rowed">
      <div className="wide-flex">
        <h2>Search result for: "{query}"</h2>
        <h4>Total: {articleNum}</h4>
      </div>
      <div className="simple-editor-content">
        <div className={"tag-list tiptap ProseMirror " + styles.filter}>
          <input
            id="article-mode"
            type="radio"
            name="mode-filter"
            checked={mode === "article"}
            onChange={() => setMode("article")}
          />
          <label htmlFor="article-mode">Articles</label>
          <input
            id="user-mode"
            type="radio"
            name="mode-filter"
            checked={mode === "user"}
            onChange={() => setMode("user")}
          />
          <label htmlFor="user-mode">Users</label>
        </div>
      </div>

      {mode === "article" && (
        <Feed key={query} type="search" query={query} counter={setArticleNum} />
      )}
      {mode === "user" && (
        <PersonList key={query} query={query} counter={setArticleNum} />
      )}
    </div>
  );
};

export default SearchPage;
