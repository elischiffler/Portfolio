import { useEffect } from 'react';
import './App.css';
import Work from './pages/Work';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;

    const handleScroll = () => {
      const sections = container.querySelectorAll('.snap-section');
      const viewportHeight = container.clientHeight;

      sections.forEach((section) => {
        // How far the top of this section is from the top of the scroll container
        const offsetTop = section.offsetTop;
        const scrollTop = container.scrollTop;

        // Distance scrolled past this section's top (negative = not yet reached)
        const scrolledPast = scrollTop - offsetTop;

        // progress: 0 at rest, 1 when fully scrolled through
        const progress = Math.min(
          Math.max(scrolledPast / viewportHeight, 0),
          1
        );
        section.style.setProperty('--fade-progress', progress);
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="snap-container">
        <div id="section-landing" className="snap-section">
          <LandingPage />
        </div>
        <div id="section-work" className="snap-section">
          <Work />
        </div>
        <div id="section-projects" className="snap-section">
          <Projects />
        </div>
        <div id="section-about" className="snap-section">
          <AboutMe />
        </div>
      </div>
    </>
  );
}

export default App;
