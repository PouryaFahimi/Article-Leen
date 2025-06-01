import React from "react";
import { useFormattedDate } from "@/hooks/useFormattedDate";

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
  article: articleSchema;
}

const Article = ({ article }: Props) => {
  const relativeDate = useFormattedDate(article.updatedAt);

  return (
    <div className="tiptap ProseMirror">
      <div key={article._id} className="article-card">
        <h2 className="article-title">{article.title}</h2>
        <div className="article-title">
          <h4>{article.username}</h4>
          <p>{relativeDate}</p>
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
