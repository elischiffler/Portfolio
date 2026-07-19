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

    const sections = Array.from(container.querySelectorAll('.snap-section'));

    // Track whether the projects section is fully in view for horizontal scroll gating
    let projectsFullyVisible = false;
    const projectsSection = document.getElementById('section-projects');

    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        projectsFullyVisible = entry.isIntersecting;
      },
      { root: container, threshold: 0.9 }
    );

    if (projectsSection) projectsObserver.observe(projectsSection);

    // IntersectionObserver smoothly fades sections based on how visible they are
    const isMobile = window.innerWidth <= 768;
    const thresholds = Array.from({ length: 20 }, (_, i) => i / 19);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (isMobile) {
            // On mobile, sections are taller than viewport — just show them fully
            entry.target.style.opacity = 1;
            entry.target.classList.add('is-visible');
            return;
          }
          const ratio = entry.intersectionRatio;
          // Stay faded until 20% visible, then ramp to full by 60%
          const fadeStart = 0.2;
          const fadeEnd = 0.6;
          let opacity;
          if (ratio <= fadeStart) {
            opacity = 0;
          } else if (ratio >= fadeEnd) {
            opacity = 1;
          } else {
            opacity = (ratio - fadeStart) / (fadeEnd - fadeStart);
          }
          entry.target.style.opacity = opacity;

          if (ratio > 0.25) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { root: container, threshold: thresholds }
    );

    sections.forEach((section) => observer.observe(section));

    // Handle horizontal lane scroll on Projects section (only when fully in view)
    const handleWheel = (e) => {
      // --- Scroll dampening: cap deltaY so fast scrolls can't skip sections ---
      const maxDelta = 100; // max pixels per wheel event
      if (Math.abs(e.deltaY) > maxDelta) {
        e.preventDefault();
        const capped = Math.sign(e.deltaY) * maxDelta;
        container.scrollTop += capped;
        return;
      }

      if (!projectsFullyVisible) return;

      const currentSection = sections.find((s) => {
        const rect = s.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        );
      });
      if (!currentSection) return;

      const lane = currentSection.querySelector('.project-lane');
      if (lane) {
        const laneRect = lane.getBoundingClientRect();
        const isOverLane =
          e.clientY >= laneRect.top &&
          e.clientY <= laneRect.bottom &&
          e.clientX >= laneRect.left &&
          e.clientX <= laneRect.right;

        if (isOverLane) {
          e.preventDefault();
          const direction = e.deltaY > 0 ? 1 : -1;
          lane.scrollBy({ left: direction * 350, behavior: 'smooth' });
        }
      }
    };

    // Sidebar navigation — scroll to section using native smooth scroll
    const handleNavigate = (e) => {
      const targetId = e.detail;
      const targetSection = sections.find((s) => s.id === targetId);
      if (!targetSection) return;
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.addEventListener('navigate-section', handleNavigate);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      projectsObserver.disconnect();
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('navigate-section', handleNavigate);
    };
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
