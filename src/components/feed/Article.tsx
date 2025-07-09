import { useState } from "react";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import {
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
  FaShareAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdModeEdit, MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Dropdown } from "./Dropdown";
import { Dialog } from "./Dialog";
import { useAlert } from "../../context/AlertContext";
import { LuScrollText } from "react-icons/lu";

export interface articleSchema {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

interface Props {
  article: articleSchema;
}

const Article = ({ article }: Props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(article.isLiked);
  const [bookmarked, setBookmarked] = useState(article.isBookmarked);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDelDialogOpen, setIsDelDialogOpen] = useState(false);
  const relativeDate = useFormattedDate(article.updatedAt);
  const absoluteDate = useFormattedDate(article.updatedAt, "absolute");
  const { user } = useUser();
  const { showAlert } = useAlert();
  const editable = user?.username === article.username ? true : false;

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
              https://article-leen.com/articles/{article._id}
            </span>
            <button onClick={() => copyToClipboard(0)}>
              <MdContentCopy className="mid-icon" />
            </button>
          </div>
        </div>
        <div>
          <span>For local usage:</span>
          <div className="flex-line">
            <span className="share-link">
              http://localhost:5173/articles/{article._id}
            </span>
            <button onClick={() => copyToClipboard(1)}>
              <MdContentCopy className="mid-icon" />
            </button>
          </div>
        </div>
        <button onClick={() => setIsDialogOpen(false)}>Done</button>
      </div>
    );
  };

  const onAdd = (action: "likes" | "bookmarks", actionValue: boolean) => {
    const requestOptions = {
      method: actionValue ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
      },
    };

    fetch(`http://localhost:3000/api/${action}/${article._id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (action === "likes") setLiked(!liked);
        else setBookmarked(!bookmarked);
        showAlert(data.message, "info");
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  const onDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
      },
    };

    fetch(`http://localhost:3000/api/articles/${article._id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // showAlert(data.message, "info");
        navigate(0);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <div className="tiptap ProseMirror">
      <div key={article._id} className="article-card">
        <div className="article-title">
          <h2>{article.title}</h2>
          <div className="flex-line">
            {editable && (
              <button onClick={() => navigate(`/compose/${article._id}`)}>
                <MdModeEdit className="mid-icon" />
              </button>
            )}
            <button onClick={() => onAdd("likes", liked)}>
              {liked ? (
                <FaHeart className="mid-icon" />
              ) : (
                <FaRegHeart className="mid-icon" />
              )}
            </button>
            <button onClick={() => onAdd("bookmarks", bookmarked)}>
              {bookmarked ? (
                <FaBookmark className="mid-icon" />
              ) : (
                <FaRegBookmark className="mid-icon" />
              )}
            </button>
            <Dropdown label="">
              <button onClick={() => setIsDialogOpen(true)}>
                <FaShareAlt className="mid-icon" />
                Share
              </button>
              <button onClick={() => navigate(`/articles/${article._id}`)}>
                <LuScrollText className="mid-icon" />
                Full View
              </button>
              {editable && (
                <button onClick={() => setIsDelDialogOpen(true)}>
                  <FaRegTrashAlt className="mid-icon" />
                  Delete
                </button>
              )}
            </Dropdown>
            <Dialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Share"
            >
              {shareOptions()}
            </Dialog>
            <Dialog
              isOpen={isDelDialogOpen}
              onClose={() => setIsDelDialogOpen(false)}
              title="Delete"
            >
              <div className="flex-rowed">
                <span>
                  Are you sure you want to delete "{article.title}" article?
                </span>
                <button onClick={onDelete}>Yes</button>
              </div>
            </Dialog>
          </div>
        </div>
        <div className="article-title">
          <button onClick={() => navigate(`/${article.username}`)}>
            <h4>{article.username}</h4>
          </button>
          <p title={absoluteDate}>{relativeDate}</p>
        </div>
        {!!article.tags.length && (
          <div className="tag-list">
            {article.tags.map((tag) => (
              <span>{tag}</span>
            ))}
          </div>
        )}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default Article;
