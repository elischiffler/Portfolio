import { useRef } from 'react';
import './App.css';
import CosmicDustBackground from './components/Backgrounds/CosmicDustBackground';
import Work from './pages/Work';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';

function App() {
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CosmicDustBackground />
      <LandingPage onWorkClick={scrollToWork} onProjectsClick={scrollToProjects} onAboutClick={scrollToAbout} onContactClick={scrollToContact} />
      <div ref={workRef}>
        <Work />
      </div>
      <div ref={projectsRef}>
        <Projects />
      </div>
      <div ref={aboutRef}>
        <AboutMe />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
}

export default App;