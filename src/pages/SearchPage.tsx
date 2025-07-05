import Feed from "@/components/feed/Feed";
import { useState } from "react";
import { useParams } from "react-router";

const SearchPage = () => {
  const [articleNum, setArticleNum] = useState(0);
  const { query } = useParams();

  return (
    <div className="flex-rowed">
      <div className="wide-flex">
        <h2>Search result for: "{query}"</h2>
        <h4>Total: {articleNum}</h4>
      </div>
      <Feed key={query} type="search" query={query} counter={setArticleNum} />
    </div>
  );
};

export default SearchPage;
