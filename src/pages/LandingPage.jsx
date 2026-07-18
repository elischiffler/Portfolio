import {
  DiReact,
  DiPython,
  DiJava,
  DiJavascript1,
  DiDatabase,
} from 'react-icons/di';
import {
  SiCplusplus,
  SiAmazon,
  SiPostman,
  SiQiskit,
  SiVite,
  SiGithub,
  SiJson,
  SiHtml5,
  SiLinux,
  SiNodedotjs,
  SiFastapi,
  SiJest,
  SiGithubactions,
  SiOpenai,
} from 'react-icons/si';
import { FiLayers, FiRepeat } from 'react-icons/fi';
import { GiAtom } from 'react-icons/gi';
import './LandingPage.css';

const skills = [
  { icon: <DiPython />, label: 'Python' },
  { icon: <DiJavascript1 />, label: 'JavaScript' },
  { icon: <SiCplusplus />, label: 'C/C++' },
  { icon: <DiJava />, label: 'Java' },
  { icon: <DiDatabase />, label: 'SQL' },
  { icon: <DiReact />, label: 'React' },
  { icon: <SiVite />, label: 'Vite' },
  { icon: <SiQiskit />, label: 'Qiskit' },
  { icon: <SiGithub />, label: 'GitHub' },
  { icon: <SiAmazon />, label: 'AWS' },
  { icon: <FiLayers />, label: 'Full-Stack' },
  { icon: <FiRepeat />, label: 'Agile' },
  { icon: <SiPostman />, label: 'REST APIs' },
  { icon: <SiJson />, label: 'JSON' },
  { icon: <GiAtom />, label: 'Ion Trapping' },
  { icon: <SiGithubactions />, label: 'CI/CD' },
  { icon: <SiHtml5 />, label: 'HTML' },
  { icon: <SiLinux />, label: 'Unix' },
  { icon: <SiNodedotjs />, label: 'Node' },
  { icon: <SiFastapi />, label: 'FastAPI' },
  { icon: <SiJest />, label: 'Jest' },
  { icon: <SiOpenai />, label: 'LLM APIs' },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Decorative watermark */}
      <span className="landing-watermark" aria-hidden="true">
        ES
      </span>

      {/* Main layout */}
      <div className="landing-inner">
        {/* Left: photo */}
        <div className="landing-photo-col">
          <img
            src="/images/Headshot.png"
            alt="Eli Schiffler"
            className="landing-headshot"
          />
        </div>

        {/* Right: identity + skills */}
        <div className="landing-content-col">
          <div className="landing-intro">
            <h1 className="landing-name">
              Eli
              <br />
              Schiffler
            </h1>
            <p className="landing-tagline">
              Software Engineer · Quantum Computing
            </p>
          </div>

          <div className="landing-divider" />

          <div className="landing-skills-section">
            <p className="landing-skills-label">Skills</p>
            <div className="skills-grid">
              {skills.map(({ icon, label }) => (
                <span key={label} className="skill-tag">
                  {icon}
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
