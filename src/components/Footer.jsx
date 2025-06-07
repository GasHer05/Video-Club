import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Desarrollado por{" "}
        <a
          href="https://www.linkedin.com/in/aldo-hernandez-288134113/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin style={{ marginLeft: "6px", verticalAlign: "middle" }} />{" "}
          Gastón Hernández
        </a>
      </p>
    </footer>
  );
}

export default Footer;
