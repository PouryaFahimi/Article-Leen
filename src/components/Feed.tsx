import { useEffect, useRef, useState } from "react";

interface articleSchema {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Feed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/articles");
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
        <div className="tiptap ProseMirror">
          <div key={article._id} className="article-card">
            <h2 className="article-title">{article.title}</h2>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
