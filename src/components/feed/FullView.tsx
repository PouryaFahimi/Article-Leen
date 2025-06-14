import { useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { articleSchema } from "./Article";
import styles from "./FullView.module.scss";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useUser } from "../../context/UserContext";

const FullView = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<articleSchema>();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const createDate = useFormattedDate(article?.createdAt, "absolute");
  const updateDate = useFormattedDate(article?.updatedAt, "absolute");
  const { user } = useUser();
  const editable = user?.username === article?.username ? true : false;

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/articles/${articleId}`
        );
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading feed...</p>;

  if (!article) return <h1>not found</h1>;

  return (
    <div className="flex-rowed">
      <div className={styles.title}>
        <div>
          <h1>{article.title}</h1>
        </div>
        <div className="flex-line">
          {editable && <button>Edit</button>}
          <button>Like</button>
          <button>Bookmark</button>
          <button>Share</button>
        </div>
      </div>
      <div className={styles.title}>
        <div className="flex-line">
          <p>by</p>
          <button>
            <h4>{article.username}</h4>
          </button>
          <p>
            Updated: {updateDate}, Created: {createDate}
          </p>
        </div>
      </div>
      <hr className={styles.hr} />
      <div
        className="article-content tiptap ProseMirror"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default FullView;
