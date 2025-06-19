import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => (
      <div className="projects">
        <div className="project-item">
          <div className="project-content left-image" style={{ flexWrap: 'wrap' }}>
            <div className="carousel auto-carousel">
              <div className="carousel-track">
                <img src="/images/JourneyGenie1.png" alt="Journey Genie Screenshot 1" className="project-image" />
                <img src="/images/JourneyGenie2.png" alt="Journey Genie Screenshot 2" className="project-image" />
                <img src="/images/JourneyGenie3.png" alt="Journey Genie Screenshot 3" className="project-image" />
                <img src="/images/JourneyGenie4.png" alt="Journey Genie Screenshot 4" className="project-image" />
                <img src="/images/JourneyGenie1.png" alt="Journey Genie Screenshot 1" className="project-image" />
                <img src="/images/JourneyGenie2.png" alt="Journey Genie Screenshot 2" className="project-image" />
                <img src="/images/JourneyGenie3.png" alt="Journey Genie Screenshot 3" className="project-image" />
                <img src="/images/JourneyGenie4.png" alt="Journey Genie Screenshot 4" className="project-image" />
              </div>
            </div>
            <div className="project-text" style={{ flex: '1 1 35%', minWidth: '250px' }}>
              <h3>Roadtrip Planner</h3>
              <p>
                Built a full-stack web application that generates personalized road trip itineraries.
                Integrated Google Maps, TripAdvisor, and other APIs to recommend destinations, lodging, and attractions.
                <br /><br />
                <strong>Technologies:</strong> React, AWS, Python, JavaScript, FastAPI, REST API, MySQL, CI/CD
              </p>
              <div className="project-links">
                <a href="https://rp-ui.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaExternalLinkAlt style={{ marginRight: '0.3rem' }} /> Live Site
                </a>
                <a href="https://github.com/Roadtrip-Planner" target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="project-item">
          <div className="project-content right-image" style={{ flexWrap: 'wrap' }}>
            <div className="project-text" style={{ flex: '1 1 35%', minWidth: '250px' }}>
              <h3>File Compression/Decompression System</h3>
              <p>
                Developed a C++ program to compress and decompress BMP image files with adjustable quality settings.
                Utilized a hash map and a Huffman encoding table to generate efficient binary representations of image data for compression.
                <br /><br />
                <strong>Technologies:</strong> C++, Huffman Encoding, Data Structures
              </p>
              <div className="project-links">
                <a href="https://github.com/elischiffler/File-Compression-Decompression" target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
                </a>
              </div>
            </div>
            <div className="carousel auto-carousel">
              <div className="carousel-track">
                <img src="/images/Compress1.bmp" alt="Compression Screenshot 1" className="project-image" />
                <img src="/images/Compress2.png" alt="Compression Screenshot 2" className="project-image" />
                <img src="/images/Compress1.bmp" alt="Compression Screenshot 1" className="project-image" />
                <img src="/images/Compress2.png" alt="Compression Screenshot 2" className="project-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="project-item">
          <div className="project-content left-image" style={{ flexWrap: 'wrap' }}>
            <div className="carousel auto-carousel">
              <div className="carousel-track">
                <img src="/images/JavaGame1.png" alt="Java Game Screenshot 1" className="project-image" />
                <img src="/images/JavaGame2.png" alt="Java Game Screenshot 2" className="project-image" />
                <img src="/images/JavaGame3.png" alt="Java Game Screenshot 3" className="project-image" />
                <img src="/images/JavaGame1.png" alt="Java Game Screenshot 1" className="project-image" />
                <img src="/images/JavaGame2.png" alt="Java Game Screenshot 2" className="project-image" />
                <img src="/images/JavaGame3.png" alt="Java Game Screenshot 3" className="project-image" />
              </div>
            </div>
            <div className="project-text" style={{ flex: '1 1 35%', minWidth: '250px' }}>
              <h3>Java Platformer Game</h3>
              <p>
                Developed a 2D platformer game in Java while learning refactoring techniques for cleaner, modular code. Gained experience with sprite animation, collision detection, and procedural environment generation.
                <br /><br />
                <strong>Technologies:</strong> Java, Object-Oriented Programming, Game Development
              </p>
              <div className="project-links">
                <a href="https://github.com/elischiffler/PokemonGame" target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <FaGithub style={{ marginRight: '0.3rem' }} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
);

export default Projects;