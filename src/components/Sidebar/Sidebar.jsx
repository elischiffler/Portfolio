import { useEffect, useRef, useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaHome,
  FaBriefcase,
  FaLaptopCode,
  FaUser,
} from 'react-icons/fa';
import './Sidebar.css';

const sections = [
  { id: 'section-landing', label: 'Home', icon: <FaHome /> },
  { id: 'section-work', label: 'Work', icon: <FaBriefcase /> },
  { id: 'section-projects', label: 'Projects', icon: <FaLaptopCode /> },
  { id: 'section-about', label: 'About', icon: <FaUser /> },
];

const socials = [
  {
    href: 'https://github.com/elischiffler',
    icon: <FaGithub />,
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/eli-schiffler/',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    external: true,
  },

  {
    href: `${import.meta.env.BASE_URL}EliSchifflerResume.pdf`,
    icon: <FaFileDownload />,
    label: 'Resume',
    external: false,
    download: true,
  },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('section-landing');
  const isNavigating = useRef(false);

  useEffect(() => {
    const observers = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isNavigating.current) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    isNavigating.current = true;
    window.dispatchEvent(new CustomEvent('navigate-section', { detail: id }));
    // Release the lock after the scroll completes
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  };

  return (
    <aside className="sidebar" aria-label="Site navigation">
      {/* Full-height line */}
      <div className="sidebar-line" aria-hidden="true" />

      {/* Section dots */}
      <nav className="sidebar-nav" aria-label="Page sections">
        {sections.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`sidebar-nav-item${activeSection === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            type="button"
          >
            <span className="sidebar-nav-icon">{icon}</span>
            <span className="sidebar-label" aria-hidden="true">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Social icons */}
      <div className="sidebar-socials">
        {socials.map(({ href, icon, label, external, download }) => (
          <a
            key={label}
            href={href}
            className="sidebar-social-link"
            aria-label={label}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            {...(download ? { download: true } : {})}
          >
            <span className="sidebar-social-icon">{icon}</span>
            <span className="sidebar-social-label">{label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
