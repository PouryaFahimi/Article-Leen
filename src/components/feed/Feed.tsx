import { useEffect, useRef, useState } from "react";
import Article from "./Article";
import { useUser } from "../../context/UserContext";
import { articleSchema } from "./Article";

interface Props {
  who?: string;
  counter?: (count: number) => void;
}

const Feed = ({ who, counter }: Props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const endpoint = who ? `user/${who}` : "";
  const { user } = useUser();

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
    },
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/articles/${endpoint}`,
          requestOptions
        );
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
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="simple-editor-content feed-list">
      {articles.length === 0 ? (
        <div>
          <h3 className="flex-line">There is no Articles yet.</h3>
          <h3 className="flex-line">Publish some!</h3>
        </div>
      ) : (
        articles.map((article: articleSchema) => <Article article={article} />)
      )}
    </div>
  );
};

export default Feed;
