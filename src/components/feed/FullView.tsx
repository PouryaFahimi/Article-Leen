import { useNavigate, useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { articleSchema } from "./Article";
import styles from "./FullView.module.scss";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useUser } from "../../context/UserContext";
import { FaRegHeart, FaRegBookmark, FaShareAlt, FaHeart } from "react-icons/fa";
import { Dialog } from "./Dialog";
import { MdContentCopy, MdModeEdit } from "react-icons/md";
import { useAlert } from "../../context/AlertContext";

const FullView = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { showAlert } = useAlert();
  const [article, setArticle] = useState<articleSchema>();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const createDate = useFormattedDate(article?.createdAt, "absolute");
  const updateDate = useFormattedDate(article?.updatedAt, "absolute");
  const { user } = useUser();
  const editable = user?.username === article?.username ? true : false;

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
          `http://localhost:3000/api/articles/${articleId}`,
          requestOptions
        );
        const data = await res.json();
        setArticle(data);
        setLiked(data.isLiked);
        console.log(data);
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

  const onLike = () => {
    const requestOptions = {
      method: liked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
      },
    };

    fetch(`http://localhost:3000/api/likes/${article?._id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        setLiked(!liked);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  if (loading) return <p>Loading article...</p>;

  if (!article) return <h1>not found</h1>;

  return (
    <div className="flex-rowed">
      <div className={styles.title}>
        <div>
          <h1>{article.title}</h1>
        </div>
        <div className="flex-line">
          {editable && (
            <button
              className={styles.option}
              onClick={() => navigate(`/compose/${article._id}`)}
            >
              <MdModeEdit className={styles.icon} />
              <p>Edit</p>
            </button>
          )}
          <button className={styles.option} onClick={onLike}>
            {liked ? (
              <FaHeart className={styles.icon} />
            ) : (
              <FaRegHeart className={styles.icon} />
            )}
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
