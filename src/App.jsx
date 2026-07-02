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
    let isAnimating = false;
    let currentIndex = 0;
    let cancelAnimation = null;

    // Easing function — ease in-out
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const animateTo = (targetScrollTop, targetSection, targetIndex) => {
      // Cancel any in-progress animation
      if (cancelAnimation) cancelAnimation();

      isAnimating = true;
      currentIndex = targetIndex;
      let cancelled = false;
      cancelAnimation = () => {
        cancelled = true;
      };

      // Fade out all sections
      sections.forEach((s) => s.classList.remove('is-visible'));

      const startScrollTop = container.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const duration = 2000;
      const startTime = performance.now();

      const step = (now) => {
        if (cancelled) return;

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOut(progress);

        container.scrollTop = startScrollTop + distance * eased;

        if (progress >= 0.4) {
          targetSection.classList.add('is-visible');
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          container.scrollTop = targetScrollTop;
          targetSection.classList.add('is-visible');
          isAnimating = false;
          cancelAnimation = null;
        }
      };

      requestAnimationFrame(step);
    };

    const handleWheel = (e) => {
      if (isAnimating) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const viewportHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const currentSection = sections[currentIndex];

      // Check if the current section has internal scroll room
      const sectionTop = currentSection.offsetTop;
      const sectionBottom = sectionTop + currentSection.offsetHeight;
      const scrolledIntoSection = scrollTop - sectionTop;
      const remainingInSection = sectionBottom - (scrollTop + viewportHeight);

      const isTallSection = currentSection.offsetHeight > viewportHeight * 1.1;

      const downThreshold = isTallSection ? viewportHeight * 0.5 : 2;
      if (direction > 0 && remainingInSection > -downThreshold) {
        return;
      }

      const upThreshold = isTallSection ? viewportHeight * 0.5 : 2;
      if (direction < 0 && scrolledIntoSection > upThreshold) {
        return;
      }

      e.preventDefault();

      const targetIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sections.length - 1
      );
      if (targetIndex === currentIndex) return;
      const targetSection = sections[targetIndex];

      animateTo(targetSection.offsetTop, targetSection, targetIndex);
    };

    // Expose navigateTo via a custom event so Sidebar can trigger animated transitions
    const handleNavigate = (e) => {
      const targetId = e.detail;
      const targetIdx = sections.findIndex((s) => s.id === targetId);
      if (targetIdx === -1) return;
      const targetSection = sections[targetIdx];
      // If already on this section, just ensure it's visible
      if (targetIdx === currentIndex) {
        targetSection.classList.add('is-visible');
        return;
      }
      animateTo(targetSection.offsetTop, targetSection, targetIdx);
    };

    window.addEventListener('navigate-section', handleNavigate);

    // Show first section on load
    if (sections[0]) sections[0].classList.add('is-visible');

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
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
