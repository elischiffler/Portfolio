import './App.css'
import { DiReact, DiJavascript1, DiPython, DiJava, DiDatabase } from 'react-icons/di'
import { SiQiskit, SiCplusplus, SiPostman, SiAmazon } from 'react-icons/si'
import { GiAtom } from 'react-icons/gi'
import { FiZap } from 'react-icons/fi'
import CosmicDustBackground from './components/CosmicDustBackground'
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload } from 'react-icons/fa'

function App() {

  return (
    <>
    <CosmicDustBackground />
      <div className="header">
        <h1 style={{ marginBottom: 0 }}>Eli Schiffler</h1>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>
          Software Developer / Quantum Computing
        </h2>
        <div className="social-links">
          <a href="https://github.com/elischiffler" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="mailto:eschiffler1122@gmail.com" className="social-icon">
            <FaEnvelope />
          </a>
          <a href="https://linkedin.com/in/eli-schiffler-93a69a298" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="/EliSchifflerResume.pdf" download className="resume-button">
            <FaDownload style={{ marginRight: '0.3rem' }} /> Resume
          </a>
        </div>
      </div>
      <div className="skills-box">
        <p>
          <span className="skill-item"><DiReact /> React</span>
          <span className="skill-item"><DiPython /> Python</span>
          <span className="skill-item"><DiJava /> Java</span>
          <span className="skill-item"><DiJavascript1 /> JavaScript</span>
          <span className="skill-item"><SiCplusplus /> C++</span>
          <span className="skill-item"><DiDatabase /> MySQL</span>
          <span className="skill-item"><SiAmazon /> AWS</span>
          <span className="skill-item"><SiPostman /> REST API</span>
          <span className="skill-item"><SiQiskit /> Qiskit</span>
          <span className="skill-item"><GiAtom /> Ion Trapping</span>
          <span className="skill-item"><FiZap /> FastAPI</span>
        </p>
      </div>
      <div className="projects">
        <div className="project-item">
          <div className="project-content left-image">
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
            <div className="project-text">
              <h3>Roadtrip Planner</h3>
              <p>Developed a full-stack web application that calculates optimized roadtrip routes using React, Node.js, and Google Maps API.</p>
            </div>
          </div>
        </div>
        <div className="project-item">
          <div className="project-content right-image">
            <div className="project-text">
              <h3>File Compression/Decompression</h3>
              <p>Built an interactive quantum eraser simulation using Qiskit and Python to demonstrate quantum entanglement to students.</p>
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
          <div className="project-content left-image">
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
            <div className="project-text">
              <h3>Roadtrip Planner</h3>
              <p>Developed a full-stack web application that calculates optimized roadtrip routes using React, Node.js, and Google Maps API.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App