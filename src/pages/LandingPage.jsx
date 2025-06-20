import { FiFileText, FiUser, FiPhone } from 'react-icons/fi';
import { DiReact, DiPython, DiJava, DiJavascript1, DiDatabase } from 'react-icons/di';
import { SiCplusplus, SiAmazon, SiPostman, SiQiskit } from 'react-icons/si';
import { GiAtom } from 'react-icons/gi';
import { FiZap } from 'react-icons/fi';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ShinyText from '../components/ShinyText/ShinyText';
import GlassIcons from '../components/GlassIcons/GlassIcons';
import BlurText from "../components/BlurText/BlurText";
import "./LandingPage.css";


const LandingPage = ({ onProjectsClick, onAboutClick, onContactClick }) => {
  const items = [
    { icon: <FiFileText />, color: 'blue', label: 'Projects', onClick: onProjectsClick },
    { icon: <FiUser />, color: 'blue', label: 'About Me', onClick: onAboutClick },
    { icon: <FiPhone />, color: 'blue', label: 'Contact', onClick: onContactClick },
  ];
  return (
    <div>
      <div className="landing-page">
        <div className="title">
          <BlurText
          text="Nice to Meet You — Let’s Get Started"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8"
        />
        </div>
        <div className="header-section">
          <div className="profile-card">
            <ProfileCard
            name="Eli Schiffler"
            title="Software Engineer / Quantum Computing"
            avatarUrl="/images/Headshot.png"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}
            />
          </div>
          <div className="skills-nav-column">
            <GlassIcons items={items}/>
            <div className="skills-list">
              <p>
                <span className="item"><DiReact /><ShinyText text="React" disabled={false} speed={3} /></span>
                <span className="item"><DiPython /><ShinyText text="Python" disabled={false} speed={3} /></span>
                <span className="item"><DiJava /><ShinyText text="Java" disabled={false} speed={3} /></span>
                <span className="item"><DiJavascript1 /><ShinyText text="JavaScript" disabled={false} speed={3} /></span>
                <span className="item"><SiCplusplus /><ShinyText text="C++" disabled={false} speed={3} /></span>
                <span className="item"><DiDatabase /><ShinyText text="MySQL" disabled={false} speed={3} /></span>
                <span className="item"><SiAmazon /><ShinyText text="AWS" disabled={false} speed={3} /></span>
                <span className="item"><SiPostman /><ShinyText text="REST API" disabled={false} speed={3} /></span>
                <span className="item"><FiZap /><ShinyText text="FastAPI" disabled={false} speed={3} /></span>
                <span className="item"><SiQiskit /><ShinyText text="Qiskit" disabled={false} speed={3} /></span>
                <span className="item"><GiAtom /><ShinyText text="Ion Trapping" disabled={false} speed={3} /></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;