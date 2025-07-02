import Feed from "@/components/feed/Feed";
import { useState } from "react";

interface Props {
  type: "likes" | "bookmarks";
}

const LibraryPage = ({ type }: Props) => {
  const [articleNum, setArticleNum] = useState(0);
  let title;
  if (type === "likes") title = "Liked";
  if (type === "bookmarks") title = "Bookmarked";

  return (
    <div className="flex-rowed">
      <div className="wide-flex">
        <h2>{title} Articles:</h2>
        <h4>Total: {articleNum}</h4>
      </div>
      <Feed type={type} counter={setArticleNum} />
    </div>
  );
};

export default LibraryPage;
