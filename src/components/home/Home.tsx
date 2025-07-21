import LetterBox from "./LetterBox";
import styles from "./Home.module.scss";
import { MdKey, MdMenuBook, MdModeEdit } from "react-icons/md";
import { FaAngleDoubleUp, FaHeart, FaShieldAlt } from "react-icons/fa";
import { IoMdStopwatch } from "react-icons/io";
import { HiSparkles } from "react-icons/hi2";
import { LuTextCursorInput } from "react-icons/lu";

const Home = () => {
  const brand = [[..."article"], [..."leen"]];
  let index = 0;

  const showBrand = () => {
    return brand.map((word) => (
      <div className="flex-line">
        {word.map((letter) => (
          <LetterBox delay={index++ * 1000}>{letter.toUpperCase()}</LetterBox>
        ))}
      </div>
    ));
  };

  return (
    <>
      <h1 className="flex-line mt-3">Welcome To</h1>
      <div className="my-3">{showBrand()}</div>
      <div className={styles.card}>
        <h3>A lovely place to:</h3>
        <ul>
          <li>
            <MdModeEdit />
            Write & Publish your thoughts and ideas in form of an Article
          </li>
          <hr />
          <li>
            <MdMenuBook />
            Read other users articles & Share them
          </li>
          <hr />
          <li>
            <FaAngleDoubleUp />
            Grow up together & Learn from each other
          </li>
          <hr />
          <li>
            <FaHeart />
            And love!
          </li>
        </ul>
      </div>
      <div className={styles.card}>
        <h3>Along nice features like:</h3>
        <ul>
          <li>
            <LuTextCursorInput />A powerful text editor powered by tiptap
          </li>
          <hr />
          <li>
            <IoMdStopwatch />
            Fast & easy
          </li>
          <hr />
          <li>
            <HiSparkles />
            Comfortable design
          </li>
          <hr />
          <li>
            <FaShieldAlt />
            Security
          </li>
          <hr />
          <li>
            <MdKey />
            Authentication
          </li>
        </ul>
      </div>
      <div className={styles.attention}>
        <h4>
          <strong>Attention</strong>The project is in initial state!
        </h4>
      </div>
      {/* <div className={styles.card}>
        <h3>Some useful sections you may miss:</h3>
        <Link to="charts">charts</Link>
      </div> */}
      <div className={styles.card}>
        <h3>Features that will come in the later versions:</h3>
        <ul>
          <li>
            Upload images in an article and everyone can see it. Showing article
            images doesn't work correctly for now, because they are not received
            from the server.
          </li>
          <hr />
          <li>
            See the other users liked articles! current you can only see your
            own likes.
          </li>
          <hr />
          <li>Color theme selection!</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
