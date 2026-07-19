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
  SiTypescript,
  SiGithub,
  SiHtml5,
  SiNodedotjs,
  SiFastapi,
  SiJest,
  SiGithubactions,
  SiOpenai,
  SiExpress,
  SiPostgresql,
  SiCypress,
} from 'react-icons/si';
import { FiLayers, FiRepeat, FiCloud } from 'react-icons/fi';
import './LandingPage.css';

const skills = [
  { icon: <DiPython />, label: 'Python' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <DiJavascript1 />, label: 'JavaScript' },
  { icon: <SiCplusplus />, label: 'C/C++' },
  { icon: <DiJava />, label: 'Java' },
  { icon: <DiDatabase />, label: 'SQL' },
  { icon: <DiReact />, label: 'React' },
  { icon: <SiNodedotjs />, label: 'Node.js' },
  { icon: <SiExpress />, label: 'Express' },
  { icon: <SiFastapi />, label: 'FastAPI' },
  { icon: <SiAmazon />, label: 'AWS' },
  { icon: <FiCloud />, label: 'Azure' },
  { icon: <SiPostgresql />, label: 'PostgreSQL' },
  { icon: <SiGithub />, label: 'GitHub' },
  { icon: <SiGithubactions />, label: 'CI/CD' },
  { icon: <FiLayers />, label: 'Full-Stack' },
  { icon: <FiRepeat />, label: 'Agile' },
  { icon: <SiPostman />, label: 'REST APIs' },
  { icon: <SiHtml5 />, label: 'HTML/CSS' },
  { icon: <SiJest />, label: 'Jest' },
  { icon: <SiCypress />, label: 'Cypress' },
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
              Software Engineer · Full-Stack Developer
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
