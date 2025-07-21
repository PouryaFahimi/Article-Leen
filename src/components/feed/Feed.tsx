import { useEffect, useRef, useState } from "react";
import Article from "./Article";
import { useUser } from "../../context/UserContext";
import { articleSchema } from "./Article";
import { availableTags } from "./Article";

interface Props {
  who?: string;
  type?: "default" | "likes" | "bookmarks" | "search";
  query?: string;
  counter?: (count: number) => void;
}

const Feed = ({ who, type = "default", query = "", counter }: Props) => {
  const [articles, setArticles] = useState<articleSchema[]>([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const visibleArticles =
    selectedTag !== "all"
      ? articles.filter((article) => article.tags.includes(selectedTag))
      : articles;
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const endpoint = who ? `user/${who}` : "";

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
    },
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    let url = `http://localhost:3000/api/`;

    switch (type) {
      case "likes":
        url += "likes/user";
        break;
      case "bookmarks":
        url += "bookmarks";
        break;
      case "search":
        url += `articles/search?q=${query}`;
        break;
      default:
        url += `articles/${endpoint}`;
        break;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        setArticles(data);
        if (counter) counter(data.length);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, query]); // have no effect because of hasFetched

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(event.target.value);
  };

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="simple-editor-content feed-list">
      <div className="tag-list tiptap ProseMirror">
        <input
          id="all"
          type="radio"
          name="tag-filter"
          value="all"
          checked={selectedTag === "all"}
          onChange={handleChange}
        />
        <label htmlFor="all">All</label>
        {availableTags.map((tag) => (
          <>
            <input
              id={tag}
              type="radio"
              name="tag-filter"
              value={tag}
              checked={selectedTag === tag}
              onChange={handleChange}
            />
            <label htmlFor={tag}>{tag}</label>
          </>
        ))}
      </div>
      {visibleArticles.length === 0 ? (
        <div>
          <h3 className="flex-line">There is no Articles yet.</h3>
          <h3 className="flex-line">Publish some!</h3>
        </div>
      ) : (
        visibleArticles.map((article) => (
          <Article key={article._id} article={article} />
        ))
      )}
    </div>
  );
};

export default Feed;
