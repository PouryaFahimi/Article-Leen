import { FaRegUserCircle } from "react-icons/fa";
import { userSchema } from "./Profile";
import styles from "./User.module.scss";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import { useNavigate } from "react-router";

interface Props {
  user: userSchema;
}

const User = ({ user }: Props) => {
  const relativeDate = useFormattedDate(user.createdAt, "relative");
  const navigate = useNavigate();

  return (
    <div className="tiptap ProseMirror">
      <div
        className={"wide-flex " + styles.card}
        onClick={() => navigate(`/${user.username}`)}
      >
        <div className="flex-line">
          <FaRegUserCircle />
          <h3>{user.username}</h3>
        </div>
        <span>Member since {relativeDate}</span>
      </div>
    </div>
  );
};

export default User;
