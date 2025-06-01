import React from "react";

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
  return (
    <div className="tiptap ProseMirror">
      <div key={article._id} className="article-card">
        <h2 className="article-title">{article.title}</h2>
        <h4 className="article-title">{article.username}</h4>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default Article;
