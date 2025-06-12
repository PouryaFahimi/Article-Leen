import { useFormattedDate } from "@/hooks/useFormattedDate";
import { FaRegHeart } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Dropdown } from "./Dropdown";

interface articleSchema {
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
  const relativeDate = useFormattedDate(article.updatedAt);
  const absoluteDate = useFormattedDate(article.updatedAt, "absolute");
  const { user } = useUser();
  const editable = user?.username === article.username ? true : false;

  const handleSelect = (item: { label: string; value: string }) => {
    console.log("Selected:", item);
  };

  return (
    <div className="tiptap ProseMirror">
      <div key={article._id} className="article-card">
        <div className="article-title">
          <h2>{article.title}</h2>
          <div className="flex-line">
            {editable && (
              <button>
                <MdModeEdit size={20} />
              </button>
            )}
            <button>
              <FaRegHeart size={20} />
            </button>
            <Dropdown
              label=""
              items={[
                { label: "Share", value: "share" },
                { label: "Bookmark", value: "bookmark" },
                { label: "Full view", value: "view" },
              ]}
              onSelect={handleSelect}
            />
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
