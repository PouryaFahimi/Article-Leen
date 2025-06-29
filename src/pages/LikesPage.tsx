import Feed from "@/components/feed/Feed";
import { useState } from "react";

const LikesPage = () => {
  const [articleNum, setArticleNum] = useState(0);

  return (
    <div className="flex-rowed">
      <div className="wide-flex">
        <h2>Your Liked Articles:</h2>
        <h4>Total: {articleNum}</h4>
      </div>
      <Feed type="likes" counter={setArticleNum} />
    </div>
  );
};

export default LikesPage;
