import { useEffect, useRef, useState } from "react";
import Article from "./Article";

interface articleSchema {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  username?: string;
}

const Feed = ({ username }: Props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const endpoint = username ? `user/${username}` : "";

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/articles/${endpoint}`
        );
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading feed...</p>;

  return (
    <div className="simple-editor-content feed-list">
      {articles.map((article: articleSchema) => (
        <Article article={article} />
      ))}
    </div>
  );
};

export default Feed;
