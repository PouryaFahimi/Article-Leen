import { FaHeart, FaRegCopyright } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer flex-rowed">
      <div className="top">
        <div>
          <h1>Article Leen</h1>
          <p>
            made with <FaHeart />
          </p>
          <p>Hope you like it.</p>
          <p>Stay tuned!</p>
        </div>
        <div>
          <h4>Contact me</h4>
          <div className="flex-line">
            <a target="_blank" href="https://github.com/PouryaFahimi">
              <IoLogoGithub />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/pourya-fahimi/"
            >
              <IoLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="down">
        <FaRegCopyright />
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
