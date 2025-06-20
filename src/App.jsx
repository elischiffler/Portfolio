import { useRef } from 'react';
import './App.css';
import CosmicDustBackground from './components/CosmicDustBackground';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';

function App() {
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

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
      <LandingPage onProjectsClick={scrollToProjects} onAboutClick={scrollToAbout} onContactClick={scrollToContact} />
      <div ref={projectsRef}>
        <Projects />
      </div>
    </>
  );
}

export default App;