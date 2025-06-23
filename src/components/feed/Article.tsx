import { useState } from "react";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdModeEdit, MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Dropdown } from "./Dropdown";
import { Dialog } from "./Dialog";
import { useAlert } from "../../context/AlertContext";

export interface articleSchema {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  article: articleSchema;
}

const Article = ({ article }: Props) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleSelect = (item: { label: string; value: string }) => {
    console.log("Selected:", item);
    if (item.value === "share") setIsDialogOpen(true);
    if (item.value === "view") navigate(`/articles/${article._id}`);
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
            <button>
              <FaRegHeart className="mid-icon" />
            </button>
            <button>
              <FaRegBookmark className="mid-icon" />
            </button>
            <Dropdown
              label=""
              items={[
                { label: "Share", value: "share" },
                { label: "Full view", value: "view" },
              ]}
              onSelect={handleSelect}
            />
            <Dialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Share"
            >
              {shareOptions()}
            </Dialog>
          </div>
        </div>
        <div className="article-title">
          <button onClick={() => navigate(`/${article.username}`)}>
            <h4>{article.username}</h4>
          </button>
          <p title={absoluteDate}>{relativeDate}</p>
        </div>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default Article;
