import { FaGithub, FaEnvelope, FaLinkedin, FaDownload } from 'react-icons/fa';
import { DiReact, DiPython, DiJava, DiJavascript1, DiDatabase } from 'react-icons/di';
import { SiCplusplus, SiAmazon, SiPostman, SiQiskit } from 'react-icons/si';
import { GiAtom } from 'react-icons/gi';
import { FiZap } from 'react-icons/fi';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ShinyText from '../components/ShinyText/ShinyText';
import "./Header.css";


const Header = () => (
  <div>
      <div className="header-section">
        <ProfileCard
        name="Eli Schiffler"
        title="Software Engineer / Quantum Computing"
        avatarUrl="/images/Headshot.png"
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() => console.log('Contact clicked')}
        />
        <div className="skills-nav-column">
  <div className="skills-list">
    <p>
      <span className="item"><DiReact /> React</span>
      <span className="item"><DiPython /> Python</span>
      <span className="item"><DiJava /> Java</span>
      <span className="item"><DiJavascript1 /> JavaScript</span>
      <span className="item"><SiCplusplus /> C++</span>
      <span className="item"><DiDatabase /> MySQL</span>
      <span className="item"><SiAmazon /> AWS</span>
      <span className="item"><SiPostman /> REST API</span>
      <span className="item"><SiQiskit /> Qiskit</span>
      <span className="item"><GiAtom /> Ion Trapping</span>
      <span className="item"><FiZap /> FastAPI</span>
    </p>
  </div>
        </div>
      </div>
      </div>
);

export default Header;