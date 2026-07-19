import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLaptopCode,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaMousePointer,
} from 'react-icons/fa';
import { SiGooglechrome } from 'react-icons/si';
import Crossfade from '../components/Crossfade/Crossfade';
import './Projects.css';

const projects = [
  {
    title: 'RoadtripsAreFun',
    description:
      'Full-stack road trip planner with a conversational chat interface that builds personalized itineraries in real time. Pulls from Google Maps, TripAdvisor, and lodging APIs to recommend stops, routes, and attractions based on your preferences.',
    tech: 'React · AWS · Python · FastAPI · REST API · SQL · CI/CD',
    images: [
      {
        src: '/images/projects/thumb/RoadTripsAreFunLanding.png',
        full: '/images/projects/full/RoadTripsAreFunLanding.png',
        alt: 'RoadtripsAreFun landing page',
      },
      {
        src: '/images/projects/thumb/RoadTripsAreFunChat.png',
        full: '/images/projects/full/RoadTripsAreFunChat.png',
        alt: 'RoadtripsAreFun chat interface',
      },
      {
        src: '/images/projects/thumb/RoadTripsAreFunItinerary.png',
        full: '/images/projects/full/RoadTripsAreFunItinerary.png',
        alt: 'RoadtripsAreFun generated itinerary',
      },
      {
        src: '/images/projects/thumb/RoadTripsAreFunMap.png',
        full: '/images/projects/full/RoadTripsAreFunMap.png',
        alt: 'RoadtripsAreFun route map',
      },
    ],
    links: [
      {
        href: 'https://roadtripsarefun.vercel.app/',
        icon: <FaExternalLinkAlt />,
        label: 'Live Site',
      },
      {
        href: 'https://github.com/elischiffler/RoadtripsAreFun',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
    login: { email: 'schifflereli@gmail.com', password: 'Testing1!' },
  },
  {
    title: 'UMami',
    description:
      'Student-run "Yelp for Cal Poly dining" with verified student reviews, nutrition labels, allergen info, and real-time restaurant hours. Features an interactive campus map with one-click Google Maps directions, automated menu scrapers, photo uploads, and a social following system.',
    tech: 'React · Node.js · Express · Supabase · PostgreSQL · Jest · Cypress · CI/CD · Azure',
    images: [
      {
        src: '/images/projects/thumb/UMamiLanding.png',
        full: '/images/projects/full/UMamiLanding.png',
        alt: 'UMami landing page',
      },
      {
        src: '/images/projects/thumb/UMamiRestaurant.png',
        full: '/images/projects/full/UMamiRestaurant.png',
        alt: 'UMami restaurant page',
      },
      {
        src: '/images/projects/thumb/UMamiNutrition.png',
        full: '/images/projects/full/UMamiNutrition.png',
        alt: 'UMami nutrition details',
      },
      {
        src: '/images/projects/thumb/UMamiProfile.png',
        full: '/images/projects/full/UMamiProfile.png',
        alt: 'UMami user profile',
      },
    ],
    links: [
      {
        href: 'https://thankful-hill-0f3846d10.7.azurestaticapps.net/',
        icon: <FaExternalLinkAlt />,
        label: 'Live Site',
      },
      {
        href: 'https://github.com/Calpoly-Yelp/UMami',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
    login: { email: 'schifflereli@gmail.com', password: 'Testing1!' },
  },
  {
    title: 'Mentro',
    description:
      'Chrome extension that scores your AI prompts in real time across ChatGPT, Gemini, Perplexity, and Claude. Uses a hybrid engine combining instant heuristic analysis with async LLM feedback to surface actionable suggestions before you hit send.',
    tech: 'TypeScript · React · Chrome MV3 · Vite · Supabase · LLM APIs · Vitest · Playwright · CI/CD',
    images: [
      {
        src: '/images/projects/thumb/MentroChatGPT.png',
        full: '/images/projects/full/MentroChatGPT.png',
        alt: 'Mentro scoring on ChatGPT',
      },
      {
        src: '/images/projects/thumb/MentroGemini.png',
        full: '/images/projects/full/MentroGemini.png',
        alt: 'Mentro scoring on Gemini',
      },
      {
        src: '/images/projects/thumb/MentroClaude.png',
        full: '/images/projects/full/MentroClaude.png',
        alt: 'Mentro scoring on Claude',
      },
    ],
    links: [
      {
        href: 'https://chromewebstore.google.com/detail/oknpipjgkmhngeehonojkmeioigiiljb',
        icon: <SiGooglechrome />,
        label: 'Chrome Store',
      },
      {
        href: 'https://youtu.be/BZ1z3NZ_uEU',
        icon: <FaYoutube />,
        label: 'Demo',
      },
      {
        href: 'https://github.com/orgs/Mentro-PromptAnalyzer/repositories',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
  },
  {
    title: 'IBM Quantum Benchmarking Tool',
    description:
      'Python CLI tool that automates randomized benchmarking across IBM Quantum superconducting processors. Measured gate fidelity and Error Per Clifford scores on ibm_marrakesh, ibm_fez, and ibm_torino, identifying optimal run windows (lowest error near 11 PM, spikes at 7 AM and 8 PM) and discovering that marrakesh is best suited for complex, time-intensive calculations due to its stability under extended runtimes.',
    tech: 'Python · Qiskit · IBM Quantum API · Data Analysis · CLI',
    images: [
      {
        src: '/images/projects/thumb/QCCTerminal.png',
        full: '/images/projects/full/QCCTerminal.png',
        alt: 'IBM Quantum benchmarking script running',
      },
      {
        src: '/images/projects/thumb/QCCSpreadsheet.png',
        full: '/images/projects/full/QCCSpreadsheet.png',
        alt: 'IBM Quantum benchmarking results data',
      },
      {
        src: '/images/projects/thumb/QCCIBMPlatform.png',
        full: '/images/projects/full/QCCIBMPlatform.png',
        alt: 'IBM Quantum platform dashboard',
      },
      {
        src: '/images/projects/thumb/QCCPlot.png',
        full: '/images/projects/full/QCCPlot.png',
        alt: 'IBM Quantum benchmarking results plot',
      },
    ],
    links: [
      {
        href: 'https://github.com/elischiffler/QCC-IBM-ErrorCode-Project',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
  },
];
const Projects = () => {
  const laneRef = useRef(null);
  const [lightbox, setLightbox] = useState(null); // { images, index }
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const swipeHintShown = useRef(false);

  // Show swipe hint once when section becomes visible
  useEffect(() => {
    const section = document.getElementById('section-projects');
    if (!section) return;

    // Show overlay immediately when section peeks in (10%)
    const earlyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !swipeHintShown.current) {
          swipeHintShown.current = true;
          setShowSwipeHint('waiting'); // overlay visible, animation not yet
        }
      },
      { threshold: 0.1 }
    );

    // Start the swipe animation once section is 50% visible
    const animObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSwipeHint('animating');
          // Auto-dismiss after 3 seconds
          setTimeout(() => setShowSwipeHint(false), 3000);
          animObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    earlyObserver.observe(section);
    animObserver.observe(section);
    return () => {
      earlyObserver.disconnect();
      animObserver.disconnect();
    };
  }, []);

  // Dismiss swipe hint on any lane interaction
  const dismissSwipeHint = useCallback(() => {
    if (showSwipeHint) setShowSwipeHint(false);
  }, [showSwipeHint]);

  const openLightbox = useCallback((images, index = 0) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const lightboxNext = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, lightboxPrev, lightboxNext]);

  // Infinite loop: when we scroll near a cloned boundary, jump seamlessly
  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const cardCount = projects.length;
    const getCardWidth = () => {
      const cards = lane.querySelectorAll('.project-card');
      if (!cards.length) return 0;
      const style = getComputedStyle(lane);
      const gap = parseFloat(style.gap) || 24;
      return cards[0].offsetWidth + gap;
    };

    // Start at the first real card (after the cloned tail set)
    lane.scrollLeft = getCardWidth() * cardCount;

    const handleScroll = () => {
      const cardWidth = getCardWidth();
      const setWidth = cardWidth * cardCount;
      const scrollLeft = lane.scrollLeft;

      if (scrollLeft >= setWidth * 2) {
        lane.scrollLeft = scrollLeft - setWidth;
      }
      if (scrollLeft < setWidth * 0.1) {
        lane.scrollLeft = scrollLeft + setWidth;
      }
    };

    // Drag-to-scroll
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e) => {
      // Don't initiate drag on links/buttons
      if (e.target.closest('a, button')) return;
      isDragging = true;
      hasDragged = false;
      startX = e.pageX;
      scrollStart = lane.scrollLeft;
      lane.style.cursor = 'grabbing';
      lane.style.scrollSnapType = 'none';
      lane.style.scrollBehavior = 'auto';
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 5) hasDragged = true;
      lane.scrollLeft = scrollStart - dx;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      lane.style.cursor = '';
      lane.style.scrollBehavior = 'smooth';
      lane.style.scrollSnapType = '';
      setTimeout(() => {
        lane.style.scrollBehavior = '';
      }, 400);
    };

    // Expose hasDragged check for lightbox click
    lane._hasDragged = () => hasDragged;

    lane.addEventListener('scroll', handleScroll);
    lane.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      lane.removeEventListener('scroll', handleScroll);
      lane.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleArrowClick = () => {
    window.dispatchEvent(
      new CustomEvent('navigate-section', { detail: 'section-about' })
    );
  };

  // Render cards helper
  const renderCards = (list, keyPrefix) =>
    list.map((project, i) => (
      <div key={`${keyPrefix}-${i}`} className="project-card">
        <div
          className="project-crossfade-wrapper"
          onClick={() => {
            if (laneRef.current?._hasDragged && laneRef.current._hasDragged())
              return;
            openLightbox(project.images);
          }}
        >
          <Crossfade
            images={project.images}
            interval={3500}
            className="project-crossfade"
          />
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {project.login && (
            <div className="dummy-login">
              <strong>Try it:</strong> {project.login.email} &nbsp;/&nbsp;{' '}
              {project.login.password}
            </div>
          )}

          <p className="project-tech">{project.tech}</p>

          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-button"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="projects">
      <div className="page-header">
        <h1 className="page-title">
          Projects
          <FaLaptopCode className="page-header-icon" aria-hidden="true" />
        </h1>
        <div className="page-header-line" />
      </div>

      <div className="project-lane-wrapper">
        <div
          className="project-lane"
          ref={laneRef}
          onScroll={dismissSwipeHint}
          onMouseDown={dismissSwipeHint}
          onTouchStart={dismissSwipeHint}
        >
          {renderCards(projects, 'clone-before')}
          {renderCards(projects, 'real')}
          {renderCards(projects, 'clone-after')}
        </div>

        {/* Swipe hint overlay */}
        {showSwipeHint && (
          <div
            className={`swipe-hint${showSwipeHint === 'animating' ? ' swipe-hint--animating' : ''}`}
            aria-hidden="true"
          >
            {showSwipeHint === 'animating' && (
              <>
                <FaMousePointer className="swipe-hint-icon" />
                <span className="swipe-hint-text">Drag to explore</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="projects-nav-hint" onClick={handleArrowClick}>
        <svg
          className="projects-nav-arrow"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Lightbox overlay */}
      {lightbox &&
        createPortal(
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>

            <button
              className="lightbox-arrow lightbox-arrow--left"
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>

            <img
              src={
                lightbox.images[lightbox.index].full ||
                lightbox.images[lightbox.index].src
              }
              alt={lightbox.images[lightbox.index].alt}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="lightbox-arrow lightbox-arrow--right"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>

            <div className="lightbox-counter">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Projects;
