import { useFormattedDate } from "@/hooks/useFormattedDate";
import { FaRegHeart } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

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
  const relativeDate = useFormattedDate(article.updatedAt);
  const absoluteDate = useFormattedDate(article.updatedAt, "absolute");

  return (
    <div className="tiptap ProseMirror">
      <div key={article._id} className="article-card">
        <div className="article-title">
          <h2>{article.title}</h2>
          <div className="flex-line">
            <button>
              <FaRegHeart size={20} />
            </button>
            <button>
              <MdMoreVert size={20} />
            </button>
          </div>
        </div>

        <div className="article-title">
          <button>
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
