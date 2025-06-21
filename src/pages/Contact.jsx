import "./Contact.css";
import BlurText from "../components/BlurText/BlurText";
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => (
  <div className="contact">
    <div className="contact-title">
      <BlurText text="Contact" delay={30} animateBy="letters" direction="top" />
    </div>
    <div className="contact-link">
      <a href="mailto:eschiffler1122@gmail.com" aria-label="Email">
        <FaEnvelope className="contact-icon" />
      </a>
      <a
        href="https://linkedin.com/in/eli-schiffler-93a69a298"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="contact-icon" />
      </a>
      <a
        href="https://github.com/elischiffler"
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="contact-icon" />
      </a>
    </div>
  </div>
);

export default Contact;
