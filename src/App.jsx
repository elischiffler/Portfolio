import { useRef, useEffect } from 'react';
import './App.css';
import CosmicDustBackground from './components/Backgrounds/CosmicDustBackground';
import Work from './pages/Work';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';

function App() {
  const workRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current && overlayRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      // Calculate opacity: 0 at top, 1 when scrolled down 100vh
      const opacity = Math.min(scrollTop / windowHeight, 1);
      overlayRef.current.style.opacity = opacity;
    }
  };

  // Set initial opacity on mount in case of page reload at a lower position
  useEffect(() => {
    handleScroll();
  }, []);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CosmicDustBackground />
      <div ref={overlayRef} className="scroll-overlay" />
      <div
        ref={containerRef}
        className="snap-container"
        onScroll={handleScroll}
      >
        <LandingPage
          onWorkClick={scrollToWork}
          onProjectsClick={scrollToProjects}
          onAboutClick={scrollToAbout}
          onContactClick={scrollToAbout}
        />
        <div ref={workRef} className="snap-section">
          <Work />
        </div>
        <div ref={projectsRef} className="snap-section">
          <Projects />
        </div>
        <div ref={aboutRef} className="snap-section">
          <AboutMe />
        </div>
      </div>
    </>
  );
}

export default App;
