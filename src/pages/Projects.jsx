import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import BlurText from "../components/BlurText/BlurText";
import './Projects.css';

const Projects = () => (
  <div className="projects">
    <div className="title">
      <BlurText
        text="Projects"
        delay={30}
        animateBy="letters"
        direction="top"
        className="text-2xl mb-8"
      />
    </div>
    <div className="project-item">
        <div className="carousel auto-carousel">
          <div className="carousel-track">
            <img
              src="/images/JourneyGenie1.png"
              alt="Journey Genie Screenshot 1"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie2.png"
              alt="Journey Genie Screenshot 2"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie3.png"
              alt="Journey Genie Screenshot 3"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie4.png"
              alt="Journey Genie Screenshot 4"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie1.png"
              alt="Journey Genie Screenshot 1"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie2.png"
              alt="Journey Genie Screenshot 2"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie3.png"
              alt="Journey Genie Screenshot 3"
              className="project-image"
            />
            <img
              src="/images/JourneyGenie4.png"
              alt="Journey Genie Screenshot 4"
              className="project-image"
            />
          </div>
        </div>
        <div className="project-text">
          <div className="project-title">
            <BlurText
              text="Roadtrip Planner"
              delay={30}
              animateBy="letters"
              direction="top"
            />
          </div>

          <div className="project-description">
            <BlurText
              text="Built a full-stack web application that generates personalized road trip itineraries. Integrated Google Maps, TripAdvisor, and other APIs to recommend destinations, lodging, and attractions."
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="Technologies: React, AWS, Python, JavaScript, FastAPI, REST API, MySQL, CI/CD"
              delay={30}
              animateBy="words"
              direction="top"
            />
          </div>
          <div className="project-links">
            <a
              href="https://rp-ui.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-button"
            >
              <FaExternalLinkAlt style={{ marginRight: "0.3rem" }} /> Live Site
            </a>
            <a
              href="https://github.com/Roadtrip-Planner"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-button"
            >
              <FaGithub style={{ marginRight: "0.3rem" }} /> GitHub
            </a>
          </div>
        </div>
    </div>
    <div className="project-item">
        <div className="project-text">
          <div className="project-title">
            <BlurText
              text="File Compression And Decompression"
              delay={30}
              animateBy="letters"
              direction="top"
            />
          </div>
          <div className="project-description">
            <BlurText
              text="Developed a C++ program to compress and decompress BMP image files with adjustable quality settings. Utilized a hash map and a Huffman encoding table to generate efficient binary representations of image data for compression."
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="Technologies: C++, Huffman Encoding, Data Structures"
              delay={30}
              animateBy="words"
              direction="top"
            />
          </div>
          <div className="project-links">
            <a
              href="https://github.com/elischiffler/File-Compression-Decompression"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-button"
            >
              <FaGithub style={{ marginRight: "0.3rem" }} /> GitHub
            </a>
          </div>
        </div>
        <div className="carousel auto-carousel">
          <div className="carousel-track">
            <img
              src="/images/Compress1.bmp"
              alt="Compression Screenshot 1"
              className="project-image"
            />
            <img
              src="/images/Compress2.png"
              alt="Compression Screenshot 2"
              className="project-image"
            />
            <img
              src="/images/Compress1.bmp"
              alt="Compression Screenshot 1"
              className="project-image"
            />
            <img
              src="/images/Compress2.png"
              alt="Compression Screenshot 2"
              className="project-image"
            />
          </div>
        </div>
    </div>
    <div className="project-item">
      <div className="carousel auto-carousel">
        <div className="carousel-track">
          <img
            src="/images/JavaGame1.png"
            alt="Java Game Screenshot 1"
            className="project-image"
          />
          <img
            src="/images/JavaGame2.png"
            alt="Java Game Screenshot 2"
            className="project-image"
          />
          <img
            src="/images/JavaGame3.png"
            alt="Java Game Screenshot 3"
            className="project-image"
          />
          <img
            src="/images/JavaGame1.png"
            alt="Java Game Screenshot 1"
            className="project-image"
          />
          <img
            src="/images/JavaGame2.png"
            alt="Java Game Screenshot 2"
            className="project-image"
          />
          <img
            src="/images/JavaGame3.png"
            alt="Java Game Screenshot 3"
            className="project-image"
          />
        </div>
      </div>
      <div className="project-text">
        <div className ="project-title">
          <BlurText
            text="Java Platformer Game"
            delay={30}
            animateBy="letters"
            direction="top"
          />
        </div>
        <div className="project-description">
          <BlurText
            text="Developed a 2D platformer game in Java while learning refactoring techniques for cleaner, modular code. Gained experience with sprite animation, collision detection, and procedural environment generation."
            delay={30}
            animateBy="words"
            direction="top"
          />
          <BlurText
          text="Technologies: Java, Object-Oriented Programming, Game Development"
          delay={30}
          animateBy="words"
          direction="top"
          />
        </div>
        <div className="project-links">
          <a
            href="https://github.com/elischiffler/PokemonGame"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
          >
            <FaGithub style={{ marginRight: "0.3rem" }} /> GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Projects;