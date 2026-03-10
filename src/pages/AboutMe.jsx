import { useState } from 'react';
import Beams from '../components/Backgrounds/Beams/Beams';
import Stack from '../components/Stack/Stack';
import BlurText from '../components/BlurText/BlurText';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const [copied, setCopied] = useState(false);
  const images = [
    { id: 1, img: '/images/AboutMe1.png' },
    { id: 2, img: '/images/AboutMe2.png' },
    { id: 3, img: '/images/AboutMe3.png' },
    { id: 4, img: '/images/AboutMe4.png' },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('schifflereli@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="about-page">
      <div className="beams-container">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#93a6c0"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <div className="about-content">
        <div className="title">
          <BlurText
            text="About Me"
            delay={30}
            animateBy="letters"
            direction="top"
            className="text-2xl mb-4"
          />
        </div>
        <div className="about-body">
          <div className="picture-container">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 300, height: 400 }}
              cardsData={images}
            />
          </div>
          <div className="text-container">
            <div className="description">
              <BlurText
                text="I am Eli Schiffler, a Computer Science student at California Polytechnic State University and President of the Cal Poly Quantum Computing Club."
                delay={50}
                animateBy="words"
                direction="top"
              />
              <BlurText
                text="My background includes a Quantum Engineering internship at Sandia National Laboratories and building full stack applications for the local community."
                delay={100}
                animateBy="words"
                direction="top"
              />
              <BlurText
                text="When I am not developing software or exploring quantum systems, I spend my time producing music, traveling, and staying active at the gym."
                delay={150}
                animateBy="words"
                direction="top"
              />
            </div>
          </div>
        </div>
        <div className="contact-container">
          <div className="contact-title">
            <BlurText
              text="Contact"
              delay={30}
              animateBy="letters"
              direction="top"
            />
          </div>
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
    </div>
  );
};

export default AboutMe;
