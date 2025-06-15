import { useNavigate, useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { articleSchema } from "./Article";
import styles from "./FullView.module.scss";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useUser } from "../../context/UserContext";
import { FaRegHeart, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { Dialog } from "./Dialog";
import { MdContentCopy, MdModeEdit } from "react-icons/md";
import { useAlert } from "../../context/AlertContext";

const FullView = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { showAlert } = useAlert();
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

  async function copyToClipboard(i: number) {
    const el = document.getElementsByClassName("share-link")[i] as HTMLElement;
    try {
      await navigator.clipboard.writeText(el.innerText);
      showAlert("Copied to Clipboard!", "success");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  const shareOptions = () => {
    return (
      <div className="flex-rowed">
        <div>
          <span>For public usage: (doesn't work currently)</span>
          <div className="flex-line">
            <span className="share-link">
              https://article-leen.com/articles/{article?._id}
            </span>
            <button onClick={() => copyToClipboard(0)}>
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
        <div>
          <span>For local usage:</span>
          <div className="flex-line">
            <span className="share-link">
              http://localhost:5173/articles/{article?._id}
            </span>
            <button onClick={() => copyToClipboard(1)}>
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
        <button onClick={() => setIsDialogOpen(false)}>Done</button>
      </div>
    );
  };

  if (loading) return <p>Loading feed...</p>;

  if (!article) return <h1>not found</h1>;

  return (
    <div className="flex-rowed">
      <div className={styles.title}>
        <div>
          <h1>{article.title}</h1>
        </div>
        <div className="flex-line">
          {editable && (
            <button className={styles.option}>
              <MdModeEdit className={styles.icon} />
              <p>Edit</p>
            </button>
          )}
          <button className={styles.option}>
            <FaRegHeart className={styles.icon} />
            <p>Like</p>
          </button>
          <button className={styles.option}>
            <FaRegBookmark className={styles.icon} />
            <p>Bookmark</p>
          </button>
          <button
            className={styles.option}
            onClick={() => setIsDialogOpen(true)}
          >
            <FaShareAlt className={styles.icon} />
            <p>Share</p>
          </button>
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="Share"
          >
            {shareOptions()}
          </Dialog>
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.info}>
          <div className="flex-line">
            <p>by</p>
            <button onClick={() => navigate(`/${article.username}`)}>
              <h4>{article.username}</h4>
            </button>
          </div>
          <p>Updated: {updateDate}</p>
          <p>Created: {createDate}</p>
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
