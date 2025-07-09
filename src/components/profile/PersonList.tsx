import { useRef, useState, useEffect } from "react";
import User from "./User";

interface Props {
  query?: string;
  counter?: (count: number) => void;
}

const PersonList = ({ query = "", counter }: Props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
    },
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const url = `http://localhost:3000/api/user/search?q=${query}`;

    const fetchData = async () => {
      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        setUsers(data);
        if (counter) counter(data.length);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="simple-editor-content flex-rowed">
      {users.length === 0 ? (
        <div>
          <h3 className="flex-line">No Users found!</h3>
        </div>
      ) : (
        users.map((user) => <User user={user} />)
      )}
    </div>
  );
};

export default PersonList;
