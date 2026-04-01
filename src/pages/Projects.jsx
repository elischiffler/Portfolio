import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import BlurText from '../components/BlurText/BlurText';
import './Projects.css';

const Projects = () => (
  <div className="projects">
    <div className="title">
      <BlurText
        text="Projects"
        delay={30}
        animateBy="letters"
        direction="top"
        className="text-2xl mb-4"
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
          <div className="dummy-login">
            <BlurText
              text="Try My Login!"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="Email: schifflereli@gmail.com"
              delay={30}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="Password: Testing1!"
              delay={30}
              animateBy="words"
              direction="top"
            />
          </div>
          <BlurText
            text="Technologies: React, AWS, Python, JavaScript, FastAPI, REST API, SQL, CI/CD"
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
            <FaExternalLinkAlt style={{ marginRight: '0.3rem' }} /> Live Site
          </a>
          <a
            href="https://github.com/Roadtrip-Planner"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
          >
            <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
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
            <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
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
        <div className="project-title">
          <BlurText
            text="Java Platformer Game"
            delay={30}
            animateBy="letters"
            direction="top"
          />
        </div>
        <div className="project-description">
          <BlurText
            text="I developed a 2D platformer game in Java while focusing on refactoring techniques to create cleaner and modular code. This project provided experience with sprite animation and collision detection. I implemented procedural environment generation to build dynamic levels. I also integrated search algorithms like A star and Dijkstra to manage pathfinding and navigation logic."
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
            <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
          </a>
        </div>
      </div>
    </div>
    <div className="project-item">
      <div className="project-text">
        <div className="project-title">
          <BlurText
            text="IBM Quantum Benchmarking Tool"
            delay={30}
            animateBy="letters"
            direction="top"
          />
        </div>
        <div className="project-description">
          <BlurText
            text="Developed a Python command-line tool to automate randomized benchmarking (RB) experiments on IBM Quantum computers. Built robust cross-platform setup scripts and integrated the IBM Quantum API to securely run jobs and export data to CSV."
            delay={30}
            animateBy="words"
            direction="top"
          />
          <BlurText
            text="Technologies: Python, Qiskit, IBM Quantum API, CLI"
            delay={30}
            animateBy="words"
            direction="top"
          />
        </div>
        <div className="project-links">
          <a
            href="https://github.com/elischiffler/QCC-IBM-ErrorCode-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
          >
            <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
          </a>
        </div>
      </div>
      <div className="carousel auto-carousel">
        <div className="carousel-track">
          <img
            src="/images/QCC-Script1.png"
            alt="Quantum Script Code"
            className="project-image contain-image"
          />
          <img
            src="/images/QCC-Script2.png"
            alt="Quantum Script CSV Results"
            className="project-image contain-image"
          />
          <img
            src="/images/QCC-Script3.png"
            alt="Quantum Script Terminal Output"
            className="project-image contain-image"
          />
          <img
            src="/images/QCC-Script1.png"
            alt="Quantum Script Code"
            className="project-image contain-image"
          />
          <img
            src="/images/QCC-Script2.png"
            alt="Quantum Script CSV Results"
            className="project-image contain-image"
          />
          <img
            src="/images/QCC-Script3.png"
            alt="Quantum Script Terminal Output"
            className="project-image contain-image"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Projects;
