import React from 'react';
import { FaGithub, FaEnvelope, FaLinkedin, FaDownload } from 'react-icons/fa';
import { DiReact, DiPython, DiJava, DiJavascript1, DiDatabase } from 'react-icons/di';
import { SiCplusplus, SiAmazon, SiPostman, SiQiskit } from 'react-icons/si';
import { GiAtom } from 'react-icons/gi';
import { FiZap } from 'react-icons/fi';
import "./Header.css";

const Header = () => (
    <div>
      <div className="header-skills-container">
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
      </div>
    </div>
);

export default Header;