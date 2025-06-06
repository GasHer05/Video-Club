import "./Footer.css";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Desarrollado por{" "}
        <a
          href="https://www.linkedin.com/in/aldo-hernandez-288134113/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-link"
        >
          <FaLinkedin className="linkedin-icon" />
          Gastón Hernández
        </a>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
