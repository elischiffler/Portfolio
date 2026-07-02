import { useState } from 'react';
import Stack from '../components/Stack/Stack';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const [copied, setCopied] = useState(false);
  const images = [
    { id: 1, img: '/images/AboutMe1.png' },
    { id: 2, img: '/images/AboutMe2.png' },
    { id: 3, img: '/images/AboutMe3.png' },
    { id: 4, img: '/images/AboutMe4.png' },
    { id: 5, img: '/images/AboutMe5.png' },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('schifflereli@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="about-page">
      <p className="page-title">About Me</p>

      <div className="about-body">
        <div className="picture-container">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 280, height: 370 }}
            cardsData={images}
          />
        </div>

        <div className="text-container">
          <div className="description">
            <p>
              I am Eli Schiffler, a Computer Science student at California
              Polytechnic State University and President of the Cal Poly Quantum
              Computing Club.
            </p>
            <p>
              My background includes a Quantum Engineering internship at Sandia
              National Laboratories and building full-stack applications for the
              local community.
            </p>
            <p>
              When I am not developing software or exploring quantum systems, I
              spend my time producing music, traveling, and staying active at
              the gym.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-container">
        <p className="contact-title">Contact</p>
        <div className="contact-links">
          <div className="email-container">
            <a
              href="mailto:schifflereli@gmail.com"
              aria-label="Email"
              onClick={handleCopyEmail}
            >
              <FaEnvelope className="contact-icon" />
            </a>
            {copied && <span className="tooltip">Copied!</span>}
          </div>
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
    </div>
  );
};

export default AboutMe;
